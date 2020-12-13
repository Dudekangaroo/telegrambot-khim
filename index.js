const axios = require('axios')
const apikey = "f4188aef";


const TelegramBot = require('node-telegram-bot-api');
const token = '1492185149:AAH6J3cjKycky0N3D1RXucOhmobc0y1oQOA';
const bot = new TelegramBot(token, {polling: true});

function getMovie(msg){
    const title = msg.text.toString();

    axios.get(`http://www.omdbapi.com/?apikey=${apikey}&t=${title}`).then(function(d){

        const {Title,Released, imdbRating, Poster, Country} = d.data;
        const content = `Title: ${Title}\n Date: ${Released}\n rate: ${imdbRating}\n poster:${Poster}\n country:${Country}\n Source: imdb.com`
        bot.sendMessage(msg.chat.id,content)

    }).catch(function(error){
        console.log(error)
    })
}
bot.on('message', (msg) => {
    
    message = msg.text.toString().toLowerCase();
    if (message.indexOf("/") === 0) {
        if (message.indexOf("start") === 1){
            bot.sendMessage(msg.chat.id,"Please input a movie you wish to know about.");
        }   else if (message.indexOf("help") === 1){
            bot.sendMessage(msg.chat.id,"Please input a movie you wish to know about.");
        }
    } else {
        getMovie(msg);
    } 
});