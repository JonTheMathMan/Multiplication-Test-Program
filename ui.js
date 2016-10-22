function submitResponse()
{
    if(document.getElementById("answerField").value != "")
    {
        responseWorker.timeResponse();
        responseWorker.logResponse();
        responseWorker.gradeResponse();
        mathProblems.pick();
        callAndDisplay();
        document.getElementById("answerField").value = "";
        document.getElementById("answerField").focus();
        
        var problemsLeft = mathProblems.getProblemsLeft().length + 1;
        if(mathProblems.getProblemsLeft().length>=0 && responseWorker.getLoggedAnswers().length < 55)
        {
            document.getElementById("sumResult").value = "Problems left: " + problemsLeft;
        }
    
    }
    if (mathProblems.getHistoryArray().length === responseWorker.getLoggedAnswers().length
        && !document.querySelector("table"))
        
    {
        scoreResults.writeTable(mathProblems.getHistoryArray(), responseWorker.getLoggedAnswers(), responseWorker.getLoggedGrades(), responseWorker.getLoggedTimes());
        
        var timeSum = Math.round(responseWorker.getLoggedTimes().reduce(function(a,b){return a+b;}, 0)*100)/100;
        
        var missedAnswerSummary = responseWorker.getLoggedGrades().filter(function(word){if(word === "Wrong!"){return true;}}).length;
        
        var shortestTime = Math.min.apply(this, responseWorker.getLoggedTimes());
        
        var longestTime = Math.max.apply(this, responseWorker.getLoggedTimes());
        
        document.getElementById("sumResult").value = "Total Time: \r\n" + timeSum + "\r\n\r\nTotal Missed:\r\n" + missedAnswerSummary + "\r\n\r\nShortest Time:\r\n" + shortestTime + "\r\n\r\nLongest Time:\r\n" + longestTime;
    }
}

function callAndDisplay()
{
    document.getElementById("userQueryPrompt").value = mathProblems.nextProblem();
}

mathProblems.pick();
callAndDisplay();

var field = document.getElementById("answerField");

field.addEventListener("keydown", function (e){
    if (e.keyCode === 13) {
        submitResponse();
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    }
}, false);