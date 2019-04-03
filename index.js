var WordAPI = require('./wordAPI');
var Word = require('./word');
var inquirer = require('inquirer');

var wordList;
var currentWord;
var ALPHA = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

function main() {
    wordList = [];
    currentWord = "";

    var api = new WordAPI();

    var topicPromise = askTopic(api);

    topicPromise.then(
        function(response) {

            console.log(response.topic);
            var listPromise = api.getList(response.topic);
            listPromise.then( function(response) {

                setWordList(response);

                // ask user to guess repeatedly
                playGame();

            });

        } 
    );
}

function userWon() {
    
    console.log();
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Nice one! Would you like to play again?",
            default: false
        }
    ]).then(function (response){
        
        if(response.confirm){
            main();
        } else {
            console.log("Okay bye!");
        }

    });

}

function setWordList(wordData) {
    var words = wordData.data;

    for(var i = 0; i < words.length; i++) {
        wordList.push(words[i].word);
    }

    // This is being put in a separate variable so that the subsequent console.log can be uncommented out to display the answer
    // This is for testing purposes
    var newWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(newWord);

    currentWord = new Word(newWord);

    console.log("" + currentWord);
}

function askTopic(api) {

    return inquirer.prompt([
        {
            type: "list",
            name: "topic",
            message: "What topic do you want your word bank to consist of?",
            choices: ["Animals", "Music", "Medicine"]
        }
    ]);

}

function playGame() {

    if (currentWord.lettersLeft === 0) {

        userWon();        
    
    } else {
        inquirer.prompt([
            {
                name: 'guess',
                message: 'Enter your guess [a-z]',
                validate: function (char) {
                    if (ALPHA.indexOf(char.toLowerCase()) === -1 ){
                        return false;
                    }
                    return true;
                }
            }
        ]).then(function(response) {
            currentWord.guess(response.guess);
            printCurrentWord();
            playGame();
        });
    }

}

function printCurrentWord() {
    console.log();
    console.log("" + currentWord);
}

function getNewWord() {
    currentWord = new Word(wordList[Math.floor(Math.random() * wordList.length)]);
}

main();