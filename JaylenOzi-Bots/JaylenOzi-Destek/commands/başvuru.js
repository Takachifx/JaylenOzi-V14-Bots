const { TextInputStyle, ModalBuilder, TextInputBuilder, SlashCommandBuilder } = require('discord.js')
const conf = require('../../JaylenOzi-Main/src/configs/sunucuayar.json');
const allah = require('../../../config.json');

    module.exports = {
      data: new SlashCommandBuilder()
      .setName("başvuru")
      .setDescription("Yetkili başvurusunda bulunmanızı sağlar."),

      async execute(interaction, client) {
        if(!client.guilds.cache.get(allah.GuildID).members.cache.get(interaction.user.id).roles.cache.has(conf.ekipRolu)) {
          return interaction.reply({ content: ":x: Tagın olmadığı için başvuramazsın.", ephemeral: true })
        } else if([conf.staffs].some(role2 => client.guilds.cache.get(allah.GuildID).members.cache.get(interaction.user.id).roles.cache.get(role2))) {
        return interaction.reply({ content: ":x: Zaten Yetkili Rolüne Sahip olduğun için başvuramazsın.", ephemeral: true })
        } else {
      const modal = new ModalBuilder()
      .setCustomId('ybasvuru')
      .setTitle('Yetkili Başvuru')
      .addComponents([
        new TextInputBuilder()
        .setCustomId('isimyas')
        .setLabel('İsim ve Yaşınız ?')
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(20)
        .setRequired(true),
        new TextInputBuilder()
        .setCustomId('aktiflik')
        .setLabel('Sunucumuzda günlük aktifliğiniz ?')
        .setStyle(TextInputStyle.Short)
        .setMinLength(1)
        .setMaxLength(10)
        .setRequired(true),
        new TextInputBuilder()
        .setCustomId('yarar')
        .setLabel('Sunucumuz için neler yapabilirsiniz ?')
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(100)
        .setRequired(true),
        new TextInputBuilder()
        .setCustomId('hakkında')
        .setLabel('Kendiniz hakkında biraz bilgi ?')
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(100)
        .setRequired(true)
      ]);
      interaction.showModal(modal, { client, interaction });
    }
  }
}