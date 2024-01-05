const Telegraf = require("telegraf");

// create telegraf object
const bot = new Telegraf("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

bot.command(["start", "help"], (ctx) => {
  let message = `
/monroe - monroe photo
/blade - blade gif
/anime - anime photo
/anime_list - anime media group
/location - location singapour
  `;
  ctx.reply(message);
});

// monroe send image
bot.command("monroe", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  bot.telegram.sendPhoto(
    ctx.chat.id,
    "https://img5.arthub.ai/user-uploads/681694e82bc7fb5172ba229729bac1b5d3e1185b/a74d124d-3b91-46e5-a07a-67421a9962c6/ah3-d7f66513d0ba.jpeg",
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

// gif send image
bot.command("blade", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
  bot.telegram.sendAnimation(
    ctx.chat.id,
    "https://media.giphy.com/media/3o7bug2wkdhpf7kbFS/giphy.gif",
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

// media group send image
bot.command("anime", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  let photos = [
    "https://img5.arthub.ai/user-uploads/ecb5e15a36c74f4784944afb75c739cb2b8eb0a9/731e29e6-30b1-409c-9b28-63daf81e461a/ah3-ca2a64f47b14.jpeg",
    "https://img5.arthub.ai/user-uploads/ecb5e15a36c74f4784944afb75c739cb2b8eb0a9/731e29e6-30b1-409c-9b28-63daf81e461a/ah3-b11264f47b14.jpeg",
    "https://img5.arthub.ai/user-uploads/ecb5e15a36c74f4784944afb75c739cb2b8eb0a9/731e29e6-30b1-409c-9b28-63daf81e461a/ah3-559d64f47b14.jpeg",
  ];
  bot.telegram.sendMediaGroup(
    ctx.chat.id,
    photos.map((photo) => {
      return { type: "photo", media: photo };
    })
  );
});

// list of anime
bot.command("anime_list", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  bot.telegram.sendDocument(
    ctx.chat.id,
    "https://img5.arthub.ai/user-uploads/ecb5e15a36c74f4784944afb75c739cb2b8eb0a9/f985e49b-8abe-4825-b9c7-122e3892b60a/ah3-ecdc6503fac3.jpeg",
    {
      thumb:
        "https://img5.arthub.ai/user-uploads/ecb5e15a36c74f4784944afb75c739cb2b8eb0a9/f985e49b-8abe-4825-b9c7-122e3892b60a/ah3-ecdc6503fac3.jpeg",
    }
  );
});

// send location
bot.command("location", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "find_location");
  bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198);
});

// create downloadable link (but this is show the bot token)
bot.on("message", async (ctx) => {
  if (ctx.updateSubTypes[0] == "document") {
    try {
      let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
      ctx.reply(`your download link: ${link}`);
    } catch (error) {
      ctx.reply(error.description);
    }
  } else if (ctx.updateSubTypes[0] == "photo") {
    try {
      let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
      ctx.reply(`your download link: ${link}`);
    } catch (error) {
      ctx.reply(error.description);
    }
  }
});

// run the bots
bot.launch();
console.log("bot is running ...");
