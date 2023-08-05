const { ChannelType, PermissionsBitField, ButtonStyle, ComponentType, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const allah = require("../../../../../../config.json");
const RoleModel = require("../../../../../JaylenOzi-Guard/src/Models/Role");
const SafeMember = require("../../../../../JaylenOzi-Guard/src/Models/Safe");
const CategoryChannels = require("../../../../../JaylenOzi-Guard/src/Models/CategoryChannels");
const TextChannels = require("../../../../../JaylenOzi-Guard/src/Models/TextChannels");
const VoiceChannels = require("../../../../../JaylenOzi-Guard/src/Models/VoiceChannels");
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup")
    .setDescription("Sunucu içindeki kanal ve rol verilerini kaydedersiniz."),

  async execute(interaction, bot) {
    if(!allah.owners.includes(interaction.user.id)) {
      return interaction.reply({ content: ":x: Bot developerı olmadığın için kurulumu yapamazsın.", ephemeral: true })
    }

    const server = new ButtonBuilder()
    .setCustomId("Server")
    .setLabel("Sunucu")
    .setStyle(ButtonStyle.Success)
    .setEmoji('966452273813287022');

    const yetki = new ButtonBuilder()
    .setCustomId("Yetki")
    .setLabel("Yetki")
    .setStyle(ButtonStyle.Success)
    .setEmoji('966452262572548166');

    const roles = new ButtonBuilder()
    .setCustomId("Roles")
    .setLabel("Rol")
    .setStyle(ButtonStyle.Success)
    .setEmoji('966452244474105896');

    const channels = new ButtonBuilder()
    .setCustomId("Channel")
    .setLabel("Kanal")
    .setStyle(ButtonStyle.Success)
    .setEmoji('966452219991953458');

    const cancel = new ButtonBuilder()
    .setCustomId("Cancel")
    .setLabel("İşlem İptal")
    .setStyle(ButtonStyle.Danger)
    .setEmoji('921703086823714858');

    const row = new ActionRowBuilder()
      .addComponents([server, yetki, roles, channels, cancel])


    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setDescription(`${interaction.member.toString()}, ${interaction.guild.name} sunucusunda kanal ve rol verilerini kaydetmek için aşağıdaki butonları kullanabilirsiniz.`)
      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Sunucu
\`\`\`
Sunucudaki Tüm (Rol/Kanal/Yetki) Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Yetki
\`\`\`
Sunucudaki Yetkilerin Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
Rol
\`\`\`
Sunucudaki Rollerin Verilerini Database Kayıt Eder.
`, inline: true
        },
      )

      .addFields(
        {
          name: "\n\u200b", value: `
\`\`\`yaml
Kanal
\`\`\`
Sunucudaki Kanalların Verilerini Database Kayıt Eder.
`, inline: true
        },

        {
          name: "\n\u200b", value: `
\`\`\`yaml
İptal
\`\`\`
Sunucu Verilerini Database Kayıt Etme İşlemini İptal Eder.
`, inline: true
        },
      )
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 2048 }))

    interaction.reply({ embeds: [embed], components: [row] })


  const filter = i => i.user.id == interaction.user.id 
  const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 1, time: 30000 });
  collector.on("collect", async (interaction) => {

    if(interaction.customId === "Server") {
      const izinler = [
        PermissionsBitField.Flags.Administrator
    ]
    const data = [];

        interaction.guild.roles.cache.filter(rol => izinler.some(rol2 => rol.permissions.has(rol2)) && !rol.managed).forEach(role => {
          data.push({ id: role.id })
        })
        await SafeMember.updateOne({ guildID: interaction.guild.id }, { $set: { Permissions: data } }, { upsert: true });
        rolbackup();
        kanalbackup();

        const ytembed = new EmbedBuilder()
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`${interaction.guild.name} sunucusundaki **Sunucu verileri** kaydedildi.\n\n**Kayıt Edilen Yetkiler:** \n\n${data.map(x => `<@&${x.id}>`).join("\n")}`)
  
      interaction.update({ embeds: [ytembed], components: [] })
    }

    if(interaction.customId === "Yetki") {
      const izinler = [
        PermissionsBitField.Flags.Administrator
    ]
    const data = [];

        interaction.guild.roles.cache.filter(rol => izinler.some(rol2 => rol.permissions.has(rol2)) && !rol.managed).forEach(role => {
          data.push({ id: role.id })
        })
        await SafeMember.updateOne({ guildID: interaction.guild.id }, { $set: { Permissions: data } }, { upsert: true });
  
        const ytembed = new EmbedBuilder()
          .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
          .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setDescription(`${interaction.guild.name} sunucusundaki **Yetki verileri** kaydedildi.\n\n**Kayıt Edilen Yetkiler:** \n\n${data.map(x => `<@&${x.id}>`).join("\n")}`)
  
      interaction.update({ embeds: [ytembed], components: [] })
    }

    if(interaction.customId === "Roles") {
      rolbackup();
      interaction.update({ content: `${interaction.guild.name} sunucusundaki rol verileri başarıyla kaydedildi.`, embeds: [], components: [] })
    }

    if(interaction.customId === "Channel") {
      kanalbackup();
      interaction.update({ content: `${interaction.guild.name} sunucusundaki kanal verileri başarıyla kaydedildi.`, embeds: [], components: [] })
    }

    if(interaction.customId === "Cancel") {
      interaction.update({ content: `İşlem başarıyla iptal edildi.`, embeds: [], components: [] })
    }

})
}};


async function rolbackup() {
if(RoleModel) {await RoleModel.deleteMany({});}

const guild = bot.guilds.cache.get(allah.GuildID);
let members = await guild.members.fetch();
guild.roles.cache.filter(e => e.name !== "@everyone" && !e.managed).forEach(async role => {
    let roleChannelOverwrites = [];
    await guild.channels.cache.filter(c => c.permissionOverwrites?.cache.has(role.id)).forEach(c => {
        let channelPerm = c.permissionOverwrites.cache.get(role.id);
        let pushlanacak = {
            id: c.id,
            allow: channelPerm.allow.toArray(),
            deny: channelPerm.deny.toArray()
        };
        roleChannelOverwrites.push(pushlanacak);
    });

      await RoleModel.updateOne({
          roleID: role.id
      }, {
          $set: {
              guildID: guild.id,
              roleID: role.id,
              name: role.name,
              color: role.hexColor,
              hoist: role.hoist,
              position: role.position,
              permissions: role.permissions.bitfield,
              mentionable: role.mentionable,
              time: Date.now(),
              members: role.members.map(m => m.id),
              channelOverwrites: roleChannelOverwrites
          }
      }, {
          upsert: true
      });
  });

console.log("Bütün Rol verileri başarı ile kayıt edildi.")
};


async function kanalbackup() {
if(TextChannels) {await TextChannels.deleteMany({});}
if(VoiceChannels) {await VoiceChannels.deleteMany({});}
if(CategoryChannels) {await CategoryChannels.deleteMany({});}

  const guild = bot.guilds.cache.get(allah.GuildID);
  if (guild) {
    const channels = [...guild.channels.cache.filter(kanal => kanal.deleted !== true).values()];
    for (let index = 0; index < channels.length; index++) {
          const channel = channels[index];
          let ChannelPermissions = []
          channel.permissionOverwrites?.cache.forEach(perm => {
              ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
          });
        
          if ((channel.type === ChannelType.GuildText) || (channel.type === ChannelType.GuildAnnouncement)) {
            await TextChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    nsfw: channel.nsfw,
                    parentID: channel.parentId,
                    position: channel.position,
                    rateLimit: channel.rateLimitPerUser,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
          if (channel.type === ChannelType.GuildVoice) {
            await VoiceChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    bitrate: channel.bitrate,
                    userLimit: channel.userLimit,
                    parentID: channel.parentId,
                    position: channel.position,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
          if (channel.type === ChannelType.GuildCategory) {
            await CategoryChannels.updateOne({
                channelID: channel.id,
            }, {
                $set: {
                    channelID: channel.id,
                    name: channel.name,
                    position: channel.position,
                    overwrites: ChannelPermissions,
                }
            }, {
                upsert: true
            });
          }
      }
      console.log("Bütün Kanal verileri başarı ile kayıt edildi.")
  }}