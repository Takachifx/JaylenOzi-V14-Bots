const conf = require("../../../../src/configs/sunucuayar.json")
const { red, green} = require("../../../../src/configs/emojis.json")
const ayar = require("../../../../src/configs/ayarName.json");
const { PermissionsBitField } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["boost"],
      name: "zengin",
      help: "zengin",
      category: "kullanıcı",
    },
  
run: async (client, message, args, embed, prefix) => {
  let kanallar = ayar.KomutKullanımKanalİsim;
    if (!kanallar.includes(message.channel.name)) return message.reply({ content: `${kanallar.map(x => `${client.channels.cache.find(chan => chan.name == x)}`)} kanallarında kullanabilirsiniz.`}).then((e) => setTimeout(() => { e.delete(); }, 10000));
      
    let booster = conf.boosterRolu || undefined;
    if(!booster) 
    {
    message.react(red)
    message.reply({ content:"Booster Rolu Bulunamadı!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    if(!message.member.roles.cache.has(booster)) 
    {
    message.react(red)
    message.reply({ content:"Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın! Fakir misin bro MbaranD ye dm den yazabilirsin !"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if(!isim) 
    {
    message.react(red)
    message.reply({ content:"Geçerli bir isim belirtmelisin!"}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
    yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    message.react(green)
    message.reply({ content:`Başarıyla ismini \`${yazilacakIsim}\` olarak değiştirdim!`}).then((e) => setTimeout(() => { e.delete(); }, 5000));
},
  };
  
  
