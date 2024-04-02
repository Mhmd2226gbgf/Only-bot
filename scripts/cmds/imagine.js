const axios = require('axios');
module.exports = {
  config: {
    name: "im",
    version: "1.0",
    author: "rehat--",
    countDown: 10,
    longDescription: {
      en: "Create an image from your text with 4 models like midjourney."
    },
    category: "ai",
    role: 0,
    guide: {
      en: '1 | DreamshaperXL10' +
        '\n2 | DynavisionXL' +
        '\n3 | JuggernautXL' +
        '\n4 | RealismEngineSDXL' +
        '\n5 | Sdxl 1.0'
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const info = args.join(' ');
    const [promptPart, modelPart] = info.split('|').map(item => item.trim());

    if (!promptPart) return message.reply("Add something baka.");

    message.reply("[⏱️]𝙄𝙈𝘼𝙂𝙄𝙉𝙀.....", async (err, info) => {
      let ui = info.messageID;

      try {
        const modelParam = modelPart;
        let apiUrl = `https://turtle-apis.onrender.com/api/v2/sdxl?prompt=${encodeURIComponent(promptPart)}`;
        if (modelPart) {
          apiUrl += `&model=${modelParam}`;
        }

        const response = await axios.get(apiUrl);
        const combinedImg = response.data.combinedImage;
        const img = response.data.imageUrls.image;
        message.unsend(ui);
        message.reply({
          body: "✨𝙂𝙀𝙉𝙀𝙍𝘼𝙏𝙀𝘿 𝙋𝙄𝘾✨\n────────────\n𝙍𝙀𝙋𝙇𝙔 𝙒𝙄𝙏𝙃 𝙉𝙐𝙈𝘽𝙀𝙍\n[1, 2, 3, 4]\n>𝙏𝙊 𝙂𝙀𝙏 𝙏𝙃𝙀 𝙋𝙄𝘾\n────────────\n🟢 𝘼𝙀-𝙎𝙏𝙃𝙀𝙍 ⚪",
          attachment: await global.utils.getStreamFromURL(combinedImg)
        }, async (err, info) => {
          let id = info.messageID; global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            imageUrls: response.data.imageUrls
          });
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`${error}`, event.threadID);
      }
    });
  },

  onReply: async function ({ api, event, Reply, usersData, args, message }) {
    const reply = parseInt(args[0]);
    const { author, messageID, imageUrls } = Reply;

    if (event.senderID !== author) return;

    try {
      if (reply >= 1 && reply <= 4) {
        const img = imageUrls[`image${reply}`];
        message.reply({ attachment: await global.utils.getStreamFromURL(img) });
      } else {
        message.reply("❌ | Invalid number try again later.");
      }
    } catch (error) {
      console.error(error);
      message.reply(`${error}`, event.threadID);
    }
    await message.unsend(Reply.messageID);
  },
};
