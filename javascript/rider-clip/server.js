const http = require('http');
const { DOMParser } = require("xmldom");
const { exec } = require('child_process');
const os = require("os");

function sendPlexRequest(start, end, name, ip){
    fetch(`http://${ip}:32400/status/sessions/?X-Plex-Token=${process.env.PLEX_KEY}`)
    .then(async (response) => {
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "application/xml");
        return doc.getElementsByTagName("Video")[0].getAttribute("ratingKey"); //get 'ratingKey'
    })
    .then(ratingKey => {
        return fetch(`http://${ip}:32400/library/metadata/${ratingKey}?X-Plex-Token=${process.env.PLEX_KEY}`)
    })
    .then(async (response) => {
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "application/xml");
        return doc.getElementsByTagName("Part")[0].attributes[3].nodeValue; //get full filepath
    })
    .then(async (filePath) => {
        exec(`ffmpeg -ss ${start} -to ${end} -copyts -i "${filePath}" -vf subtitles="${
                    filePath
                    .replaceAll('\\','\\\\\\\\')
                    .replaceAll('\'','\\\\\\\'')
                    .replaceAll(':', "\\\\\\:")
                    .replaceAll('[', '\\\\\\[')
                    .replaceAll(']', '\\\\\\]')
                }" -vcodec libx265 -crf 35 -c:a copy -ss ${start} -to ${end} -y "${name}.mp4"`, 
                (err, stdout, stderr) => {
            if(err) console.log(err);
        });
    })
}

require('dotenv').config();

http.createServer(function(req, res){
    if(req.method == 'POST'){
        const params = new URLSearchParams(req.url.slice(1));
        const interfaces = os.networkInterfaces();
        const ip = interfaces['Wi-Fi'][1].address;          //too lazy to make it work for ethernet, just type 'Ethernet' out here if you want ig
        console.log(ip);
        sendPlexRequest(params.get('start'), params.get('end'), params.get('name') ?? (new Date()).getUTCMilliseconds(), ip)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`${params.get('start')} to ${params.get('end')} received`);
    }
}).listen(8080);

console.log("Server up and running...");