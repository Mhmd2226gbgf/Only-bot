. const fs = require('fs');
const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "approval",
    version: "1.0",
    author: "Ohio03 | @tu33rtle.xy",
    category: "events"
  },
  onStart: async function ({ api, event, threadsData, message }) {
    const uid = "61555220946194";
    const groupId = event.threadID;
    const threadData = await threadsData.get(groupId);
    const name = threadData.threadName;
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);    

    let threads = [];
    try {
      threads = JSON.parse(fs.readFileSync('threads.json'));
    } catch (err) {
      console.error('', err);
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await message.send({
        body: `❎ | You Added This Bot Without Permission !!\n\n✧Take Permission From bot Admin's to Use Bot In Your Group !!\n✧Join Bot Support GC to Contact With Admin's !!\n\n✧Type ${p}botgc within 20 seconds.\n\n- or . contact 61555220946194.`,
        attachment: await getStreamFromURL("https://i.postimg.cc/rsVb8Ty4/4b8d6edb-d2aa-4ce1-aca5-4f90f7b5798a-1.png")
      });
    }

    if (!threads.includes(groupId) && event.logMessageType === "log:subscribe") {
      await new Promise((resolve) => setTimeout(resolve, 20000)); // Delay of 1 seconds
      await api.sendMessage(
        `====== Approval ======\n\n🍁 | Group:- ${name}\n🆔 | TID:- ${groupId}\n☣️ | Event:- The Group Need Approval`,
        uid,
        async () => {
          await api.removeUserFromGroup(api.getCurrentUserID(), groupId);
        }
      );
    }
  }
};
