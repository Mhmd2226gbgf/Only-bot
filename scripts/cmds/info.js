  const fs = require('fs');
const moment = require('moment-timezone');
const NepaliDate = require('nepali-date');

module.exports = {
  config: {
    name: "info",
    version: "1.4",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    const botName = "🦄𝑳𝑨𝑼𝑹𝑰𝑨𝑵𝑬☆𝑺𝑻𝑨𝑻🦄";
    const botPrefix = "'";
    const authorName = "👑𝑴𝑳𝑫☆𝑬𝑴𝑴𝑨𝑵𝑼𝑬𝑳👑";
    const authorFB = "m.me/100085261760009";
    const authorInsta = " 𝑭𝑼𝑪𝑲 𝑰𝑵𝑺𝑻𝑨𝑮𝑹𝑨𝑴🥴";
    const status = " 🖤 𝑪𝑬́𝑳𝑰𝑩𝑨𝑻𝑨𝑰𝑹𝑬 🖤 ";

    const urls = JSON.parse(fs.readFileSync('zoro.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    // Get current date and time in Asia/Kathmandu timezone
    const now = moment().tz('Asia/Kathmandu');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    // Get Nepali date
    const nepaliDate = new NepaliDate(now.toDate());
    const bsDateStr = nepaliDate.format("dddd, DD MMMM");

    // Calculate bot uptime
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}hrs: ${minutes}min: ${seconds}sec`;

    message.reply({
      body: `===「 Bot & owner Info 」===\n❏Bot Name: ${botName}\n❏Bot Prefix: ${botPrefix}\n❏AuthorName: ${authorName}\n❏FB: ${authorFB}\n❏Insta: ${authorInsta}\n❏Status: ${status}\n❏Date: ${date}\n❏BsDate:  ${bsDateStr}\n❏Time: ${time}\n❏Bot Running: ${uptimeString}\n=====================`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
