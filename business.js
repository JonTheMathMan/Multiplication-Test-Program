var mathProblems = (function() {
    var exports = {};

    var unused = buildProblems();
    var used = [];

    exports.nextProblem = function() 
    {
        return used[used.length-1];
    }

    exports.getHistoryArray = function() 
    {
        return used;
    }
    
    exports.getProblemsLeft = function()
    {
        return unused;
    }

    function buildProblems()
    {
        var unusedProblems=[];
        for(var q=3;q<=12;q++)
        {
            for(var r=3;r<=12;r++)
            {
                var builtProblem = q + " X " + r;
                var rBuiltProblem = r + " X " +q;
                
                var containsProblemInReverse = (unusedProblems.indexOf(rBuiltProblem) === -1);
                
                if (containsProblemInReverse)
                    unusedProblems.push(builtProblem);
            }
        }
        return unusedProblems;
    };

    exports.pick = function()
    {
        var randomIndex = Math.floor(Math.random() * unused.length);
        used = used.concat(unused.splice(randomIndex, 1));
        return used;
    }

    return exports;
})();


var responseWorker = (function() {
    var exports = {};

    var submittedAnswers = [];
    var answerTimes = [];
    var isCorrect = [];
    var lastTime = Date.now();

    exports.getLoggedAnswers = function()
    {
        return submittedAnswers;
    }

    exports.getLoggedTimes = function()
    {
        return answerTimes;
    }

    exports.getLoggedGrades = function()
    {
        return isCorrect;
    }

    exports.logResponse = function()
    {
        var response = document.getElementById("answerField").value;
        submittedAnswers.push(response);
    }

    exports.timeResponse = function()
    {
        var timeElapsed = Date.now() - lastTime;
        var secondsElapsed = timeElapsed/1000;
        answerTimes.push(secondsElapsed);
        lastTime = Date.now();
    }

    exports.gradeResponse = function()
    {
        var queries = mathProblems.getHistoryArray();
        var answer = document.getElementById("answerField").value;
        var productResult = queries[queries.length-1].substr(0,2)*queries[queries.length-1].substr(4,3);
        if( productResult == answer)
        {
            isCorrect.push("Correct!")
        }else{
            isCorrect.push("Wrong!")
        }
    }

    return exports;
})();