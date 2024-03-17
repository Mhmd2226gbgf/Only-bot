var jl = "jameslim";
const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "tr",
    version: "1.0.",
    hasPermssion: 0,
    Author:"Bishesh",
    description: "transformer logo",
    commandCategory: "logo",
    usages: "text",
    cooldowns: 2,
  },
  onStart: async function ({ api, event, args, Users }) {
    let { messageID, threadID } = event;
    let textie = args.join(" ");
    if (!textie)
      return api.sendMessage(
        "Please put text to proceed!",
        event.threadID,
        event.messageID
      );
    let pathImg = __dirname + `/cache/transformer.png`;
    try {
      const response = await axios.get(
        `https://chards-bot-api.richardretadao1.repl.co/api/textpro/transformer?text=${textie}`,
        { responseType: "arraybuffer" }
      );
      fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
      api.sendMessage(
        {
          body: "[TRANSFORMER] Logo created:",
          attachment: fs.createReadStream(pathImg),
        },
        threadID,
        () => fs.unlinkSync(pathImg),
        messageID
      );
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while processing the command.", threadID, messageID);
    }
  },
};