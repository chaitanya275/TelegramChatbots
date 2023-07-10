const TelegramBot = require('node-telegram-bot-api');
const request=require('request')
const token = '5771288409:AAGTIsnjx1egEtZK0z_n60vSo8Be52zTztY';
const bot =new TelegramBot(token,{polling:true});     
bot.on('message',  (msg) => 
{
    if(msg.text.toLowerCase().includes("start"))
    {
        bot.sendMessage(msg.chat.id, "Welcome");
    }
    else if (msg.text.toLowerCase()=="hi") { 
        bot.sendMessage(msg.chat.id, "Hello "+ msg.from.first_name);
        bot.sendMessage(msg.chat.id, "Please Enter Your City Name");
    }
    else if (msg.text.toLowerCase()=="bye") {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    } 
    else
    {   
       request('http://api.weatherapi.com/v1/current.json?q='+msg.text+'&key=6ad5fd5c9afc40faa03135524222006',function(err,response,body)
       {
          console.log(msg);
          if("error" in JSON.parse(body))
          {
            bot.sendMessage(msg.chat.id,"Please Enter Correct City Name");
          }
          else
          {
                bot.sendMessage(msg.chat.id,"City:"+JSON.parse(body).location.name);
                bot.sendMessage(msg.chat.id,"Region:"+JSON.parse(body).location.region);
                bot.sendMessage(msg.chat.id,"Country:"+JSON.parse(body).location.country);
                bot.sendMessage(msg.chat.id,"Temp:"+JSON.parse(body).current.temp_c);
                bot.sendMessage(msg.chat.id,"Present Condition:"+JSON.parse(body).current.condition.text);
                bot.sendMessage(msg.chat.id,"Humidity:"+JSON.parse(body).current.humidity);
          }
        })
    }
})
