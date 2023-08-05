const { PermissionsBitField, ChannelType, SlashCommandBuilder, EmbedBuilder, IntegrationApplication, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { cizgi, green, red, star } = require('../../JaylenOzi-Main/src/configs/emojis.json');
const { Database } = require("ark.db");
const ozisetup = new Database("../data.json");
const conf = require('../../JaylenOzi-Main/src/configs/sunucuayar.json');
const allah = require('../../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kurulum")
    .setDescription("Destek bot kanal ve emoji kurulumunu sağlar."),

  async execute(interaction, client) {
   
     if(interaction.guild === null) {
        return interaction.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if(!allah.owners.includes(interaction.user.id)) {
        return interaction.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
      } else {

       await interaction.reply({ content: `${green} Support Kanal kurulumu başarıyla tamamlanmıştır.`, ephemeral: true })

            await interaction.guild.channels.create({ name: 'Canlı Destek', 
                type: ChannelType.GuildCategory 
              }).then(async (channel) => {
                ozisetup.set("CanlıDestekKategoryID", `${channel.id}`)

                await interaction.guild.channels.create({ name: 'Canli Destek', 
                  type: ChannelType.GuildText,
                  parent: parent.id
              }).then(async (channel2) => {
                ozisetup.set("CanlıDestekLogChannelID", `${channel2.id}`)
              });
            });

            const parent = await interaction.guild.channels.create({ name: '📋 Yetkili basvuru', 
                type: ChannelType.GuildText 
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru', 
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: [PermissionsBitField.Flags.ViewChannel,PermissionsBitField.Flags.SendMessages],
                }]
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru-onay',  
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                    deny: [PermissionsBitField.Flags.SendMessages],
                }]
              }).then(async (channel) => {
                ozisetup.set("BaşvuruDurumLog", `${channel.id}`)
              });

            await interaction.guild.channels.create({ name: '📋・yetkili-basvuru-log',  
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
               {
                    id: conf.yetkilialımRol,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
               }]
              }).then(async (channel) => {
                ozisetup.set("BaşvuruLogChannelID", `${channel.id}`)
              });

            await interaction.guild.channels.create({ name: 'istek-sikayet-log', 
                type: ChannelType.GuildText,
                parent: parent.id,
                permissionOverwrites: [{
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                }]
              }).then(async (channel) => {
                ozisetup.set("ÖneriİstekSikayetChannelID", `${channel.id}`)
              });
}
  },
};
