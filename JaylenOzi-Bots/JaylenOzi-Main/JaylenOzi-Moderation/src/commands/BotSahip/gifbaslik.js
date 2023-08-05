const { Discord } = require("discord.js");
const { star } = require("../../../../src/configs/emojis.json")
const moment = require("moment");
moment.locale("tr");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["gif-baslik"],
      name: "gif-başlık",
      help: "gif-başlık",
      category: "sahip",
      owner: true,
    },

  run: async (client, message, args, embed) => {

    const channel = client.channels.cache.find(x => x.name == "gif");

    const man = await channel.threads.create({
        name: 'Boys',
        autoArchiveDuration: 10080,
        reason: 'Erkek gif/pp için açtım.',
    });

    const woman = await channel.threads.create({
        name: 'Girls',
        autoArchiveDuration: 10080,
        reason: 'Kadın gif/pp için açtım.',
    });

    const bw = await channel.threads.create({
        name: 'Black And White',
        autoArchiveDuration: 10080,
        reason: 'Black And White gif/pp için açtım.',
    });

    const cp = await channel.threads.create({
        name: 'Couple',
        autoArchiveDuration: 10080,
        reason: 'Couple gif/pp için açtım.',
    });


message.channel.send({
"content": `
${star} **Merhaba!** ${message.guild.name}
Aşağıda bulunan alt konularımızdan ulaşmak istediğiniz gif kategorisini seçin.

<#${man.id}><#${woman.id}><#${bw.id}><#${cp.id}>
`})

  },
};