module.exports = {
	config: {
			name: "anu",
			version: "1.0",
			author: "D_S",
			countDown: 5,
			role: 2,
			shortDescription: "",
			longDescription: "",
			category: "bot",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "anu") return message.reply("yes.. Master...🥳❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "good morning") return message.reply("good morning..🌄❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "good evening") return message.reply("good evening🌃❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "good afternoon") return message.reply("good afternoon ❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "good night") return message.reply("good night 💤🌙");
	if (event.body && event.body.toLowerCase() == "hi") return message.reply("yes...🥳");
	if (event.body && event.body.toLowerCase() == "hello") return message.reply("◡̈⋆ʜᴇʟʟᴏ(●’◡’●)ﾉ");
	if (event.body && event.body.toLowerCase() == "how are you") return message.reply("fine and you..?");
 }
};
