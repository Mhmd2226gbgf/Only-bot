const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "pinterest", 
    aliases: ["pin"], 
    version: "1.0.2", 
    author: "D_S", 
    role: 0,
    countDown: 5,
    shortDescription:{
      en: "Search for images on Pinterest"}, 
    longDescription:{
      en:""}, 
    category: "image", 
    guide: {
      en: "{prefix}pinterest <search query> -<number of images>"
    }
  }, 

  onStart: async function({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(`Please enter the search query and number of images to return in the format: ${config.guide.en}`, event.threadID, event.messageID);
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf('-')).trim();
      const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;

      const res = await axios.get(`https://pinterest.ea-sy.tech/v1/pinterest?s=`);
      const data = res.data.urls;
      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i], { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here are the top ${imgData.length} image results for "${keySearchs}":`
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, 'cache'));
    } catch (error) {
      console.error(error);
      return api.sendMessage(`📷| Please follow this format: \nex: -pinterest cat -10`, event.threadID, event.messageID);
    }
  }
};
