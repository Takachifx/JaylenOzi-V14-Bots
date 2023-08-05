const moment = require("moment");
moment.locale("tr");
const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField } = require("discord.js");
module.exports = {
  conf: {
    aliases: ["allmute"],
    name: "allmute",
    help: "allmute",
    category: "yönetim",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) return;
    let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
    if (!channel) return message.channel.send({ content:"Bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));
    channel.members.filter((x) => !x.permissions.has(PermissionsBitField.Flags.Administrator))
      .forEach((x, index) => {
        client.wait(index * 1000);
        x.voice.setMute(true);
      });
    message.reply({ content:`🎤 \`${channel.name}\` kanalındaki tüm üyeler susturuldu!`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
  },
};

