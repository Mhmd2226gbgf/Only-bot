const fs = require('fs');
module.exports = {
  config: {
    name: "approve",
    version: "2.0",
    role: "2",
    author: "Ohio03 | @tu33rtle.xy",
    cooldown: "5",
    longDescription: {
      en: "Group Approve and Disapproved Command",
    },
    category: "Developer",
    guide: {
      en: "{pn} (add/remove) [thread ID]"
    }
  },
  onStart: async function ({ api, event, threadsData, message, args }) {
    
    const threadsFile = 'threads.json';

    if (args.length < 1) {
      message.reply("You must provide an action: !approve (add/remove) [thread ID]");
      return;
    }
    if (!args || args.length < 2) {
      return message.reply("You must provide the following action: !approve (add/remove) [thread ID]");
    }

    const action = args[0];
    const groupId = args[1];
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync(threadsFile));
    } catch (err) {
      console.error('', err);
    }

    if (action === "add") {
      if (!threads.includes(groupId)) {
        threads.push(groupId);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
        message.reply(`🍁 | Group: ${name}\n🆔 | TID: ${groupId}\n✅ | Status: Approved!`);
      } else {
        message.reply(`🍁 | Group: ${name}\n🆔 | TID: ${groupId}\n✅ | Status: Already Approved!`);
      }
    } else if (action === "remove") {
      const index = threads.indexOf(groupId);
      if (index >= 0) {
        threads.splice(index, 1);
        fs.writeFileSync(threadsFile, JSON.stringify(threads));
        message.reply(`🍁 | Group: ${name}\n🆔 | TID: ${groupId}\n❎ | Status: Disapproved!`);
      } else {
        message.reply(`🍁 | Group: ${name}\n🆔 | TID: ${groupId}\n❎ | Status: Not Approved Before!`);
      }
    }
  }
};
