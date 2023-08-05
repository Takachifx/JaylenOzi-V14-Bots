const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser, hyperlink, PermissionsBitField } = require("discord.js");
const Canvas = require("canvas")
const conf = require("../../../../src/configs/sunucuayar.json")
const { registerFont } = require("canvas");
registerFont('./MarlinGeo-Black.otf', { family: 'Marlin Geo Black' })
const ayar = require("../../../../src/configs/ayarName.json");
const allah = require("../../../../../../config.json");

module.exports = {
  conf: {
    aliases: ["ship"],
    name: "ship",
    help: "ship",
    category: "kullanıcı",
  },

  run: async (client, message, args) => {
let kanallar = ayar.KomutKullanımKanalİsim;
if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 

const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
  
      let fontSize = 70;
  
      do {
          ctx.font = `${fontSize -= 10}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);
  
      return ctx.font;
  };
      const canvas = Canvas.createCanvas(380, 150);
      const ctx = canvas.getContext('2d');
  
      let background = await Canvas.loadImage(client.guilds.cache.get(allah.GuildID).bannerURL({dynamic: true, extension: "png"}) ? client.guilds.cache.get(allah.GuildID).bannerURL({dynamic: true, extension: "png"}) + `?size=4096` : "https://cdn.discordapp.com/attachments/938786568175513660/970470122806472785/sex.png");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      const erkek = conf.erkekRolleri[0];
      const kadin = conf.kizRolleri[0];
      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.filter(m => m.user.bot === false && message.member.roles.cache.get(erkek) ? m.roles.cache.get(kadin) : m.roles.cache.get(erkek)).random();
      
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: 'png' }));
      ctx.drawImage(avatar, 26, 25, 100, 100);
  
      const avatar2 = await Canvas.loadImage(member.displayAvatarURL({ extension: 'png' }));
      ctx.drawImage(avatar2, 256, 25, 100, 100);


    let nickname = `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`
    let nickname2 = `[${message.author.tag}](https://discord.com/users/${message.author.id})`

    const çok = await Canvas.loadImage('https://cdn.discordapp.com/attachments/938786568175513660/970478360402743306/cok.png');
    const orta = await Canvas.loadImage('https://cdn.discordapp.com/attachments/938786568175513660/970478360931213312/orta.png');
    const az = await Canvas.loadImage('https://media.discordapp.net/attachments/938786568175513660/970478359731658812/az.png');
    const random = Math.floor(Math.random()*99)+1;


let shipdurum;
if(random < 10) shipdurum = "💔💔💔💔💔💔💔💔💔💔";
if(random >= 10 && random < 20) shipdurum = "💖💔💔💔💔💔💔💔💔💔";
if(random >= 20 && random < 30) shipdurum = "💖💖💔💔💔💔💔💔💔💔";
if(random >= 30 && random < 40) shipdurum = "💖💖💖💔💔💔💔💔💔💔";
if(random >= 40 && random < 50) shipdurum = "💖💖💖💖💔💔💔💔💔💔";
if(random >= 50 && random < 60) shipdurum = "💖💖💖💖💖💔💔💔💔💔";
if(random >= 60 && random < 70) shipdurum = "💖💖💖💖💖💖💔💔💔💔";
if(random >= 70 && random < 80) shipdurum = "💖💖💖💖💖💖💖💔💔💔";
if(random >= 80 && random < 90) shipdurum = "💖💖💖💖💖💖💖💖💔💔";
if(random >= 90 && random < 98) shipdurum = "💖💖💖💖💖💖💖💖💖💔";
if(random >= 98) shipdurum = "💖💖💖💖💖💖💖💖💖💖";

    if (random >= 60) {
      ctx.drawImage(çok, 163, 45, 60, 60); 
      const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ozi.png'});
      let ozi = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`
☁ **${nickname} seni ${nickname2} Çok Mu Seviyor?**
💟 ${random}%

${shipdurum}`)
.setImage("attachment://ozi.png")
message.channel.send({ content: `**[ \`${member.user.tag}\` ]**`, embeds: [ozi], files: [attachment] })
} else if (random <= 40) {
      ctx.drawImage(az, 163, 45, 60, 60);
      const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ozi.png'});
      let ozi = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`
☁ **${nickname} seni ${nickname2} Çok Mu Seviyor?**
💟 ${random}%

${shipdurum}`)
.setImage("attachment://ozi.png")
message.channel.send({ content: `**[ \`${member.user.tag}\` ]**`, embeds: [ozi], files: [attachment] })
} else {
      ctx.drawImage(orta, 163, 45, 60, 60); 
      const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'ozi.png'});
      let ozi = new EmbedBuilder()
.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
.setDescription(`
☁ **${nickname} seni ${nickname2} Çok Mu Seviyor?**
💟 ${random}%

${shipdurum}`)
.setImage("attachment://ozi.png")
message.channel.send({ content: `**[ \`${member.user.tag}\` ]**`, embeds: [ozi], files: [attachment] })
    }

}
};
