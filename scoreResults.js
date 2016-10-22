var scoreResults = (function () {
    var exports = {};
    
    exports.writeTable = function (questions, userAnswers, correct, timeElapsed) {
        var message = document.createElement("p");
        message.textContent="To restart, refresh the page. To find problems with shortest or longest time use your browser search (CTRL f )";
        document.body.appendChild(message);
        
        var table = document.createElement("table");
        var thead = document.createElement("thead");
        var theadRow = document.createElement("tr");
        
        table.appendChild(thead);
        thead.appendChild(theadRow);
        
        var tableHeaders = ["Question", "Your Answer", "Score", "Seconds Taken"]
        appendElementsFromArrayOfStrings(thead, "th", tableHeaders);
        
        for (var i = 0, l = questions.length; i < l; i++) {
            var row = document.createElement("tr");
            var tableData = [questions[i], userAnswers[i], correct[i], timeElapsed[i]];
            appendElementsFromArrayOfStrings(row, "td", tableData);
            table.appendChild(row);
        }
        
        document.body.appendChild(table);
    }
    
    return exports;
})();

function appendElementsFromArrayOfStrings (parent, type, strings) {
    strings.forEach(function(string) {
        var child = document.createElement(type);
        child.textContent = string;
        parent.appendChild(child);
    });
}