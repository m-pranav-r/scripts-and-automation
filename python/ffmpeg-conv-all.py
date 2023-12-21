#from PIL import Image
import glob, os, subprocess

#page = 0
for infile in glob.glob("**/*.asf", recursive=True):
    file, ext = os.path.splitext(infile)
    subprocess.run("ffmpeg -i {} {}.mp4".format((infile), file))
    os.remove(infile)
"""
    with Image.open(infile) as im:
        width, height = im.size
        image_left = im.crop((200 * width / 1920, 0, 961 * width / 1920, height))
        image_left.save(fp = str(page) + ".png", format="png")
        page += 1
        image_right = im.crop(((200 + 761) * width / 1920, 0, (961 + 761) * width / 1920, height))
        image_right.save(fp = str(page) + ".png", format="png")
        page += 1
for delfile in glob.glob("**/*.mp4", recursive=True):
    os.remove(delfile)
"""
print("Done")
