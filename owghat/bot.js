const Telegraf = require("telegraf");

const { getOwghatFromAPI } = require("./assets/apis/owghat_api");

require("dotenv").config();

// tokens & variables
const BOT_TOKEN = process.env.BOT_TOKEN;

// create telegraf object
const bot = new Telegraf(BOT_TOKEN);

// help message for start the bot
let helpMessage = `
به ربات اوقات شرعی خود اومدی. کافیه اسم شهر رو بفرستی :)
`;

bot.command("start", (ctx) => {
  ctx.reply(helpMessage);
});

bot.on("message", (ctx) => {
  let city = ctx.message.text;
  getOwghatFromAPI(city, false).then((res) => {
    let data = res.data.result,
      message;
    try {
      (data = res.data.result),
        (message = `
شهر: ${data.city}
اذان صبح: ${data.azan_sobh}
طلوع آفتاب: ${data.toloe_aftab}
اذان ظهر: ${data.azan_zohre}
غروب آفتاب: ${data.ghorob_aftab}
اذان مغرب: ${data.azan_maghreb}
نیمه شب شرعی: ${data.nime_shabe_sharie}
`);
    } catch (err) {
      message = "شهر مورد نظر یافت نشد";
    }
    ctx.reply(message);
  });
});

// run the bots
bot.launch();
console.log("bot is running ...");
