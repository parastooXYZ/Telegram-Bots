const Telegraf = require("telegraf");
const axios = require("axios");
const fs = require("fs");
const { error } = require("console");

// create telegraf object
const bot = new Telegraf("xxxxxxxxxxxxxxxxxxxxxxxxxx");

let helpMessage = `
*Simple API Bot*
/fortune - random fortune text
/cat - random cat images
/cat \`<msg>\` - random cat image with message
/dogbreeds - all dog breeds available
/dog - random dog image
/dog \`<msg>\` - dog image with specific breeds
/time - return now date & time
  `;

// help commands
bot.command(["start", "help"], (ctx) => {
  // ctx.reply(message);
  bot.telegram.sendMessage(ctx.from.id, helpMessage, {
    parse_mode: "markdown",
  });
});

// fortune command
bot.command("fortune", (ctx) => {
  axios
    .get("http://yerkee.com/api/fortune")
    .then((res) => ctx.reply(res.data.fortune))
    .catch((err) => console.log(err));
});

// cat command
bot.command("cat", async (ctx) => {
  let input = ctx.message.text,
    inputArray = input.split(" ");

  if (inputArray.length == 1) {
    // return cat image
    let res = await axios.get("https://api.thecatapi.com/v1/images/search");
    ctx.replyWithPhoto(res.data[0].url, {
      reply_to_message_id: ctx.message.message_id,
    });
  } else {
    // return cat image with text message
    inputArray.shift();
    input = inputArray.join(" ");
    ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
});

// dog breeds command
bot.command("dogbreeds", (ctx) => {
  // read dog breeds json file
  let rawData = fs.readFileSync("./7.1 dogbreeds.json.json", "utf-8");
  // parse json to array
  let data = JSON.parse(rawData);

  // create dog breeds message
  let message = "Dog Breeds:\n";
  data.forEach((breed) => {
    message += `-${breed}\n`;
  });
  ctx.reply(message);
});

// dog image command
bot.command("dog", (ctx) => {
  let input = ctx.message.text.split(" ");
  if (input.length == 1) {
    ctx.reply("you must give a dog breed as the second argument", {
      reply_to_message_id: ctx.message.message_id,
    });
    return;
  } else {
    let breedInput = input[1];

    // read dog breeds json file
    let rawData = fs.readFileSync("./7.1 dogbreeds.json.json", "utf-8");
    // parse json to array
    let data = JSON.parse(rawData);

    // get dog breeds and send photo
    if (data.includes(breedInput)) {
      axios
        .get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
        .then((res) =>
          ctx.replyWithPhoto(res.data.message, {
            reply_to_message_id: ctx.message.message_id,
          })
        )
        .catch((err) => console.log(err));
    } else {
      let suggestions = data.filter((breed) => {
        return breed.startsWith(breedInput);
      });
      let messages = `Did you mean:\n`;
      suggestions.forEach((breed) => {
        messages += `-${breed}\n`;
      });

      if (suggestions.length == 0) {
        ctx.reply("cannot find breed");
      } else {
        ctx.reply(messages);
      }
    }
  }
});

// get time and date
bot.command("time", (ctx) => {
  let weekDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  let date = new Date(),
    message = `
Date is: ${date.getFullYear()}/${
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
    }/${date.getDate()}
Time is: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
Day of week is: ${weekDays[date.getDay() + 1]}
  `;
  ctx.reply(message);
});

// run the bots
bot.launch();
console.log("bot is running ...");
