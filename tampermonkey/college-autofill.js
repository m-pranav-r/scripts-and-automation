// ==UserScript==
// @name         VNRMTP AutoFill
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  To automate form filling for menial exams
// @author       franau
// @match        https://vnrvjiet858.examly.io/*
// @icon         https://static.wikia.nocookie.net/epic-stuff/images/d/d2/Idle_demo1.gif/revision/latest?cb=20200912224555
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('body').append('<input type="button" value="Jump-Start" id="CP">')
    $("#CP").css("position", "fixed").css("top", 2).css("left", 2).css("z-index", 999).css("border-radius", 3).css("background-color", "#000000").css("color","#ffffff").css("border-color","#ffffff");
    document.getElementById("CP").addEventListener("click", function() {StartAnswer();});
    var questionsAnswered = 0;
    var isPass = document.getElementsByClassName("mark-card")[0].innerText;
    var globalTimerId;
    function StartAnswer(){
        setInterval(function() {StartFill();}, 2000);
    }
    function StartFill() {
        if(questionsAnswered > 30){ return;}
        console.log("startfill called");
        document.getElementById("mcqsinglecorrect-answer-check").click();
        document.getElementById("tt-option-0").click();
        setTimeout(function(){
            isPass = document.getElementsByClassName("mark-card")[0].innerText;
            if(isPass == '1') {SubmitAnswer();}
            else {globalTimerId = setTimeout(function() {FillSecond();}, 350);}
        }, 50);
    }
    function FillSecond(){
        console.log("fillsecond called");
        document.getElementById("tt-option-1").click();
        setTimeout(function(){
            isPass = document.getElementsByClassName("mark-card")[0].innerText;
            if(isPass == '1'){ SubmitAnswer();}
            else{ globalTimerId = setTimeout(function() {FillThird();}, 350);}
        }, 50);
    }
    function FillThird(){
        console.log("fillthird called");
        document.getElementById("tt-option-2").click();
        setTimeout(function(){
            isPass = document.getElementsByClassName("mark-card")[0].innerText;
            if(isPass == '1'){ SubmitAnswer();}
            else{ globalTimerId = setTimeout(function() {FillFourth();}, 350);}
        }, 50);
    }
    function FillFourth(){
        console.log("fillfourth called");
        document.getElementById("tt-option-3").click();
        setTimeout(function(){
            isPass = document.getElementsByClassName("mark-card")[0].innerText;
            if(isPass == '1'){ SubmitAnswer();}
            else{ globalTimerId = setTimeout(function() {FillFifth();}, 350);}
        }, 50);
    }
    function FillFifth(){
        console.log("last called");
        document.getElementById("tt-option-4").click();
        SubmitAnswer();
    }
    function SubmitAnswer(){
        clearTimeout(globalTimerId);
        questionsAnswered++;
        if(questionsAnswered == 1) document.getElementsByClassName("submitBtn formSubmit")[7].click();
        else document.getElementsByClassName("submitBtn formSubmit")[8].click();
		if(questionsAnswered == 30) setTimeout(function(){
			document.getElementsByClassName("submitBtn formSubmit")[9].click();
		}, 150);
    }
})();