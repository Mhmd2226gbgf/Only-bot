const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🕊️ 𝕄𝕃𝔻☆𝔼𝕄𝕄𝔸ℕ𝕌𝔼𝕃 🕊️ ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "NTKhang", // original author Kshitiz 
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "info",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);

		if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `🕊️ 𝑳𝑨𝑼𝑹𝑰𝑨𝑵𝑬❃𝑺𝑻𝑨𝑻 🕊️  \n\n◦❭❯❱ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 ❰❮❬◦`; // replace with your name 

			for (const [name, value] of commands) {
				if (value.config.role > 1 && role < value.config.role) continue;

				const category = value.config.category || "Uncategorized";
				categories[category] = categories[category] || { commands: [] };
				categories[category].commands.push(name);
			}

			Object.keys(categories).forEach((category) => {
				if (category !== "info") {
					msg += `\n╭───────────✿🦄\n│ 『  ${category.toUpperCase()}  』`;


					const names = categories[category].commands.sort();
					for (let i = 0; i < names.length; i += 3) {
						const cmds = names.slice(i, i + 3).map((item) => `✰${item}`);
						msg += `\n│ ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
					}

					msg += `\n╰────────────✿🦄`;
				}
			});

			const totalCommands = commands.size;
			msg += `\n𝗖𝘂𝗿𝗿𝗲𝗻𝘁𝗹𝘆, 𝘁𝗵𝗲 🦄𝑳𝑨𝑼𝑹𝑰𝑨𝑵𝑬🦄 𝒂 ${totalCommands} 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆 𝒂𝒄𝒕𝒊𝒗𝒆 \n`;
			msg += `𝑻𝒂𝒑𝒆𝒛 ${prefix} 𝒉𝒆𝒍𝒑 𝗰𝗺𝗱𝗡𝗮𝗺𝗲 𝒑𝒐𝒖𝒓 𝒗𝒐𝒊𝒓 𝒍𝒂 𝒍𝒊𝒔𝒕𝒆📜 𝒅𝒆𝒔 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒆𝒔 𝒅𝒊𝒔𝒑𝒐𝒏𝒊𝒃𝒍𝒆\n\n`;
			msg += `🦄 | 𝑨𝑫𝑴𝑰𝑵 : ✪°°𝕄𝕃𝔻°°✪`; // its not decoy so change it if you want 

			const helpListImages = [
				'https://i.ibb.co/dp6YfTq/image.jpg',

				'https://i.ibb.co/gv9wTkV/image.jpg',

				'https://i.ibb.co/gMb27mj/image.jpg',

				'https://i.ibb.co/r0nHN2M/image.jpg',

				'https://i.ibb.co/wBCxH53/image.jpg',
												
			];

			const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

			await message.reply({
				body: msg,
				attachment: await global.utils.getStreamFromURL(helpListImage),
			});
		} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

const response = `╭── NAME ────⭓
	│ ${configCommand.name}
	├── INFO
	│ Description: ${longDescription}
	│ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
	│ Other names in your group: Do not have
	│ Version: ${configCommand.version || "1.0"}
	│ Role: ${roleText}
	│ Time per command: ${configCommand.countDown || 1}s
	│ Author: ${author}
	├── Usage
	│ ${usage}
	├── Notes
	│ The content inside <XXXXX> can be changed
	│ The content inside [a|b|c] is a or b or c
	╰━━━━━━━❖`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
		}
