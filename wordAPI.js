var axios = require("axios");
var Word = require("./word");

function wordAPI() {

    this.getList = function (topic) {
        var url = "https://api.datamuse.com/words?topics=" + topic;

        return axios.get(url);
    }

    this.validateList = function(response) {
        console.log(response.data);
        if (response.data.length === 0){
            return false;
        } else {
            return true;
        }
    }

}

module.exports = wordAPI;