function Letter(letter) {
    this.letter = letter;
    this.guessed = makeGuess(letter);
    
    function makeGuess(letter) {
        if (letter === ' '){
            return true;
        } else {
            return false;
        }
    }

    this.guess = function (guess) {
        if (this.letter === guess) {
            this.guessed = true;
            return true;
        } else {
            return false;
        }
    }
    this.toString = function() {
        if (this.guessed){
            return this.letter;
        } else {
            return '_';
        }
    }
}

module.exports = Letter;