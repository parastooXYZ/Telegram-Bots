const Telegraf = require("telegraf");

// create telegraf object
const bot = new Telegraf("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

// help message
const helpMessage = `
Say something to me
/start - start the bot
/help - command reference
/echo - say "You said echo"
/echo <msg> - echo a message
`;

// log the name & message of user
bot.use((ctx, next) => {
  // get what it the type of message
  switch (ctx.updateSubTypes[0]) {
    case "text":
      // if the type is text, send username & message
      bot.telegram.sendMessage(
        ctx.chat.id,
        `${ctx.from.username} said: ${ctx.message.text}`
      );
      break;
    case "sticker":
      // if the type is sticker, send username & "sticker"
      bot.telegram.sendMessage(
        ctx.chat.id,
        `${ctx.from.username} said: ${ctx.updateSubTypes[0]}`
      );
      break;
  }
  
  next(); // middleware
});

// start command
bot.start((ctx) => {
  ctx.reply("hi. i'm Echo bot.");
  ctx.reply(helpMessage);
});

// help command
bot.help((ctx) => {
  ctx.reply(helpMessage);
});

// return the message to user
bot.command("echo", (ctx) => {
  let input = ctx.message.text,
    message = "";

  // split message to ['echo', ...]
  let inputArray = input.split(" ");

  if (inputArray.length == 1) {
    // user send nothing
    message = "You said echo";
  } else {
    inputArray.shift(); // remove the /echo from message
    message = inputArray.join(" "); // concat the messages
  }

  ctx.reply(message);
});

// run the bots
bot.launch();
console.log("bot is running ...");
