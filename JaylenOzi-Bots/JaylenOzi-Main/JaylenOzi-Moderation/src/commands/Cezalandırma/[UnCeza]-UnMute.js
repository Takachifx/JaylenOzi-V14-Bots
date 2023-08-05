const { ButtonStyle, EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');
const moment = require("moment");
moment.locale("tr");
const penals = require("../../../../src/schemas/penals");
const conf = require("../../../../src/configs/sunucuayar.json")
const allah = require("../../../../../../config.json");
const {red, green, Revuu} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
module.exports = {
  conf: {
    aliases: ["unmute","uncmute"],
    name: "unmute",
    help: "unmute <ozi/ID>",
    category: "cezalandırma",
  },

  run: async (client, message, args, embed) => {
    let kanallar = ayar.KomutKullanımKanalİsim;
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !conf.cmuteHammer.some(x => message.member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send({ content: "Yeterli yetkin bulunmuyor!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) 
    {
    message.react(red)
    message.channel.send( { content:"Bir üye belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!conf.chatMute.some(x => member.roles.cache.has(x)) && !conf.voiceMute.some(x => member.roles.cache.has(x))) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üye muteli değil!"}).then((e) => setTimeout(() => { e.delete(); }, 5000));   
    return }
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && member.roles.highest.position >= message.member.roles.highest.position) 
    {
    message.react(red)
    message.channel.send( { content:"Kendinle aynı yetkide ya da daha yetkili olan birinin susturmasını kaldıramazsın!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if (!member.manageable) 
    {
    message.react(red)
    message.channel.send( { content:"Bu üyenin susturmasını kaldıramıyorum!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    
    let mute = new ButtonBuilder()
    .setCustomId("mute")
    .setLabel("Chat Mute")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("997820341718089739");

    let vmute = new ButtonBuilder()
    .setCustomId("vmute")
    .setLabel("Voice Mute")
    .setStyle(ButtonStyle.Secondary)
    .setEmoji("997876085624668231");

    if (!conf.chatMute.some(x => member.roles.cache.has(x))) {
        mute.setStyle(ButtonStyle.Secondary).setDisabled(true);
    } else {
        mute.setStyle(ButtonStyle.Success);
    }

    if (!conf.voiceMute.some(x => member.roles.cache.has(x))) {
        vmute.setStyle(ButtonStyle.Secondary).setDisabled(true);
    } else {
        vmute.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ mute, vmute ]);
  
    let ozi = new EmbedBuilder()  
    .setDescription(`${member} üyesinin kaldırmak istediğiniz chat/voice mute cezalarını butonla aşağıdan seçiniz.`)
    .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [ozi], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "mute") {
      await button.deferUpdate();

      mute.setStyle(ButtonStyle.Secondary).setDisabled(true);

      message.react(green)
      member.roles.remove(conf.chatMute);
      const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
      if (data) {
        data.active = false;
        await data.save();
      }

      if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından susturmanız kaldırıldı!`}).catch(() => {});

      let ozi = new EmbedBuilder()  
      .setDescription(`${member.toString()} üyesinin susturması, ${message.author} tarafından kaldırıldı.`)
      .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
  
      await msg.edit({ embeds: [ozi], components: [row] });

      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **${message.author.tag}** tarafından Chat Mute cezası kaldırıldı.`)
      .addFields(
        { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
        { name: "Affeden",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}` })
      message.guild.channels.cache.get(conf.cmuteLogChannel).wsend({ embeds: [log]});

    }
    if (button.customId === "vmute") {
      await button.deferUpdate();

      vmute.setStyle(ButtonStyle.Secondary).setDisabled(true);

      message.react(green)
      member.roles.remove(conf.voiceMute);
      if (member.voice.channelId && member.voice.serverMute) member.voice.setMute(false);
      const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "VOICE-MUTE", active: true });
      if (data) {
        data.active = false;
        data.removed = true;
        await data.save();
      }

      if (allah.Main.dmMessages) member.send({ content:`**${message.guild.name}** sunucusunda, **${message.author.tag}** tarafından **sesli kanallarda** olan susturmanız kaldırıldı!`}).catch(() => {});

      let ozi = new EmbedBuilder()  
      .setDescription(`${member.toString()} üyesinin **sesli kanallarda** susturması, ${message.author} tarafından kaldırıldı.`)
      .setFooter({ text: `Kapalı olan buton mutesi olmadığını gösterir kullanılamaz.`})
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
  
      await msg.edit({ embeds: [ozi], components: [row] });

      const log = new EmbedBuilder()
      .setDescription(`**${member ? member.user.tag : member.user.username}** adlı kullanıcının **${message.author.tag}** tarafından Ses Mute cezası kaldırıldı.`)
      .addFields(
        { name: "Affedilen",  value: `[${member ? member.user.tag : member.user.username}](https://discord.com/users/${member.user.id})`, inline: true },
        { name: "Affeden",  value: `[${message.author.tag}](https://discord.com/users/${message.author.id})`, inline: true },
        { name: "Ceza Bitiş",  value: `<t:${Math.floor((Date.now()) / 1000)}:R>`, inline: true },
        )
      .setFooter({ text:`${moment(Date.now()).format("LLL")}` })
      message.guild.channels.cache.get(conf.vmuteLogChannel).wsend({ embeds: [log]});
    }

  })
  },
};


