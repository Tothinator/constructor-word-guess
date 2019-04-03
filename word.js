var Letter = require('./letter');

function Word (word) {
    this.lettersLeft = countBlanks(word);
    this.word = makeWord(word);
    
    function makeWord(word) {
        var wordArray = [];
        for (var i = 0; i < word.length; i ++) {
            wordArray.push(new Letter(word.charAt(i)));
        }
        return wordArray;
    }

    function countBlanks(word) {
        var lettersLeft = 0;
        for (var i = 0; i < word.length; i++) {
            if (word.charAt(i) !== ' '){
                lettersLeft++;
            }
        }
        return lettersLeft;
    }

    this.guess = function(guess) {
        for (var i = 0; i < this.word.length; i++) {
            var wasGuessed = this.word[i].guess(guess);
            if (wasGuessed) {
                this.lettersLeft--;
            }
        }
    }

    this.toString = function() {
        return this.word.join(" ");
    }
}

module.exports = Word;