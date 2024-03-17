module.exports = {
  config: {
    name: "flower",
    version: "1.0.1",
    hasPermssion: 0,
    Author: "Bishesh",
    description: "flowers logo",
    commandCategory: "logo",
    usages: "text",
    cooldowns: 2,
  },
  onStart: async function ({ api, event, args, Users }) {
    let { senderID, threadID, messageID } = event;
    const axios = require("axios");
    const fs = require("fs-extra");
    let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
    let text = args.join(" ");
    if (!text) {
      api.sendMessage(
        `wrong fomat!!\nUse: ${global.config.PREFIX}${this.config.name} text`,
        event.threadID,
        event.messageID
      );
      return;
    }
    api.sendMessage("Please wait...", event.threadID, event.messageID);

    try {
      const response = await axios.get(
        `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flower-typography?text=${text}`,
        {
          responseType: "arraybuffer",
        }
      );
      fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
      api.sendMessage(
        {
          body: "› logo created:",
          attachment: fs.createReadStream(pathImg),
        },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
      );
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while processing the command.",
        threadID,
        messageID
      );
    }
  },
};