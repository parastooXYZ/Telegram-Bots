const Telegraf = require("telegraf");

// create telegraf object
const bot = new Telegraf("XXXXXXXXXXXXXXXXXXXXXXXXXX");

// start command
bot.start((ctx) => {
  ctx.reply(
    `You name is: ${ctx.from.first_name} & you have entered the ${ctx.updateSubTypes[0]} command.`
  );
});

// help command
bot.help((ctx) => {
  //   ctx.reply("You have entered the help command.");
  //   bot.telegram.sendMessage(ctx.chat.id, "this is help command", {
  //     parse_mode: "Markdown",
  //     disable_notifications: true,
  //   });

  ctx.reply("hello world", {
    parse_mode: "Markdown",
    disable_notifications: true,
  });
});

// settings command
bot.settings((ctx) => {
  ctx.reply("You have entered the settings command.");
});

// custom test command
bot.command(["test", "Test"], (ctx) => {
  ctx.reply(`hello ${ctx.from.first_name}`);
});

// when someone send cat, reply it Meow
bot.hears("cat", (ctx) => {
  ctx.reply("Meow");
});

// action when user send text message
bot.on("text", (ctx , next) => {
  ctx.reply("this is a text message");
  next(ctx); // this is middleware
});

// action when user send text message
bot.on("text", (ctx, next) => {
  ctx.state.apple = 5; // set the ctx state
  ctx.reply("this is a text message");
  next(ctx); // this is middleware
});

// handles username eg. @botfather
bot.mention("botfather", (ctx) => {
  ctx.reply("mention method");
});

// handles phone numbers eg. +98 123 456-7890
bot.phone("+98 123 456-7890", (ctx) => {
  ctx.reply("phone number");
});

// handles hashtag eg. #hash
bot.hashtag("hash", (ctx) => {
  ctx.reply("hashtag");
});

// when the user use the bots this code is calling
bot.use((ctx, next) => {
  ctx.reply(`you used the bot and state is: ${ctx.state.apple}`);
  next(ctx);
});

// running the bot
bot.launch();
console.log("bot is running ...");
