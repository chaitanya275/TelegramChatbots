const TelegramBot= require('node-telegram-bot-api');
const request=require('request')
const token = '6331320675:AAEizWOmd0kfLpFyIeFG_Owd5EHhkFDch38';
const bot =new TelegramBot(token,{polling:true});
bot.on('message',function(mg)
{
    if(mg.text.includes("/start"))
    {
        bot.sendMessage(mg.chat.id, "Hi");
    }
    else{
     request('http://www.omdbapi.com/?t='+mg.text+'&apikey=619faa49',function(err,response,body)
     {
        console.log(JSON.parse(body).Response)
        if(JSON.parse(body).Response=="True")
       {
        bot.sendMessage(mg.chat.id,"Title:"+JSON.parse(body).Title);
        bot.sendMessage(mg.chat.id,"ReleaseDate:"+JSON.parse(body).Released);
        bot.sendMessage(mg.chat.id,"Actors:"+JSON.parse(body).Actors);
        bot.sendMessage(mg.chat.id,"IMDB Rating:"+JSON.parse(body).imdbRating);
        bot.sendMessage(mg.chat.id,"Director:"+JSON.parse(body).Director);
        bot.sendMessage(mg.chat.id,"Plot:"+JSON.parse(body).Plot);
        bot.sendMessage(mg.chat.id,"Country:"+JSON.parse(body).Country);
        bot.sendMessage(mg.chat.id,"Box Office Collection:"+JSON.parse(body).BoxOffice+"USD");
        bot.sendMessage(mg.chat.id,"Poster:"+JSON.parse(body).Poster);
       }
    else
    {
        bot.sendMessage(mg.chat.id,"Please enter correct Name according to IMDB");
    }
     }
     )}
})    