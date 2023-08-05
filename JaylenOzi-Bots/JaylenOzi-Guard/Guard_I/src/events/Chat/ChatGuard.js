const { EmbedBuilder, AuditLogEvent, ChannelType } = require("discord.js");
const setup = require("../../../../../JaylenOzi-Main/src/configs/sunucuayar.json");
const allah = require("../../../../../../config.json");
const moment = require("moment");
require("moment-duration-format")
moment.locale("tr")
const ms = require("ms");
const client = global.bot;

const usersMap = new Map();
const getLimit = new Map();
const LIMIT = 3;
const TIME = 10000;
const DIFF = 1000;

let küfürler = ["allahoc","allahoç","allahamk","allahaq","0r0spuc0cu","4n4n1 sk3r1m","p1c","@n@nı skrm","evladi","orsb","orsbcogu","amnskm","anaskm","oc",
"a\u011fz\u0131na s\u0131\u00e7ay\u0131m","seks","sex","allahs\u0131z","amar\u0131m","ambiti","am biti","amc\u0131\u011f\u0131","amc\u0131\u011f\u0131n",
"amc\u0131\u011f\u0131n\u0131","amc\u0131\u011f\u0131n\u0131z\u0131","amc\u0131k","amc\u0131k ho\u015faf\u0131","amc\u0131klama","amc\u0131kland\u0131","amcik","amck","amckl",
"amcklama","amcklaryla","amckta","amcktan","amcuk","am\u0131k","am\u0131na","amına","am\u0131nako","am\u0131na koy","am\u0131na koyar\u0131m","am\u0131na koyay\u0131m","am\u0131nakoyim",
"am\u0131na koyyim","am\u0131na s","am\u0131na sikem","am\u0131na sokam","am\u0131n feryad\u0131","am\u0131n\u0131","am\u0131n\u0131 s","am\u0131n oglu","am\u0131no\u011flu","am\u0131n o\u011flu",
"am\u0131s\u0131na","am\u0131s\u0131n\u0131","amina","amina g","amina k","aminako","aminakoyarim","amina koyarim","amina koyay\u0131m","amina koyayim","aminakoyim","aminda",
"amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amin oglu","amiyum","amkafa","amk \u00e7ocu\u011fu","amlarnzn","aml\u0131","ammak","ammna","amn",
"amna","amnda","amndaki","amngtn","amnn","amona","ams\u0131z","amsiz","amsz","amteri","amu\u011fa","amuna","anaaann","anal","analarn",
"anan","anana","anandan","anan\u0131","anan\u0131","anan\u0131n","anan\u0131n am","anan\u0131n am\u0131","anan\u0131n d\u00f6l\u00fc","anan\u0131nki","anan\u0131sikerim",
"anan\u0131 sikerim","anan\u0131sikeyim","anan\u0131 sikeyim","anan\u0131z\u0131n","anan\u0131z\u0131n am","anani","ananin","ananisikerim","anani sikerim","ananisikeyim",
"anani sikeyim","anann","ananz","anas","anas\u0131n\u0131","anas\u0131n\u0131n am","anas\u0131 orospu","anasi","anasinin","anay","anayin","angut","anneni","annesiz",
"anuna","atm\u0131k","att\u0131rd\u0131\u011f\u0131m","attrrm","auzlu","avrat","ayklarmalrmsikerim","azd\u0131m","azd\u0131r",
"azd\u0131r\u0131c\u0131","babaannesi ka\u015far","baban\u0131","baban\u0131n","babani","babas\u0131 pezevenk","baca\u011f\u0131na s\u0131\u00e7ay\u0131m","bac\u0131na",
"bac\u0131n\u0131","bac\u0131n\u0131n","bacini","bacn","bacndan","bacy","b\u0131z\u0131r","bosalmak","bo\u015falmak","daltassak","dalyarak","dalyarrak","dassagi",
"siktim","dildo","dkerim","domal","domalan","domald\u0131","domald\u0131n","domal\u0131k","domal\u0131yor","domalmak","domalm\u0131\u015f",
"domals\u0131n","domalt","domaltarak","domalt\u0131p","domalt\u0131r","domalt\u0131r\u0131m","domaltip","domaltmak","d\u00f6l\u00fc","d\u00f6nek","d\u00fcd\u00fck",
"ebeni","ebenin","ebeninki","ebleh","ecdad\u0131n\u0131","ecdadini","emi","fahise","fahi\u015fe","feri\u015ftah","ferre","fuck","fucker","fuckin","fucking","gavad",
"gavat","giberim","giberler","gibi\u015f","gibmek","gibtiler","godo\u015f","godumun","gotelek","gotlalesi","gotten","gotundeki","gotunden","gotune",
"gotunu","gotveren","goyiim","goyum","goyuyim","goyyim","g\u00f6t","g\u00f6t deli\u011fi","g\u00f6telek","g\u00f6t herif","g\u00f6tlalesi","g\u00f6tlek","g\u00f6to\u011flan\u0131",
"g\u00f6t o\u011flan\u0131","g\u00f6to\u015f","g\u00f6tten","g\u00f6t\u00fc","g\u00f6t\u00fcn","g\u00f6t\u00fcne","g\u00f6t\u00fcnekoyim","g\u00f6t\u00fcne koyim","g\u00f6t\u00fcn\u00fc",
"g\u00f6tveren","g\u00f6t veren","g\u00f6t verir","gtelek","gtn","gtnde","gtnden","gtne","gtten","gtveren",
"ho\u015faf\u0131","h\u00f6d\u00fck","ibneleri","ibnelri","ibnenin","ibnerator","ibnesi",
"ipne","iserim","i\u015ferim","ito\u011flu it","kafam girsin","kafas\u0131z","kahpe","kahpenin","kahpenin feryad\u0131","kaltak","kanc\u0131k",
"karhane","ka\u015far","kavatn","kevase","keva\u015fe","kevvase","kodu\u011fmun","kodu\u011fmunun","kodumun","kodumunun",
"koduumun","koyay\u0131m","kukudaym","laciye boyad\u0131m","libo\u015f","malafat",
"mna","oc","ocuu","ocuun","O\u00c7","o\u00e7","o. \u00e7ocu\u011fu","o\u011flan","o\u011flanc\u0131","o\u011flu it","orosbucocuu",
"orospu","orospucocugu","orospu cocugu","orospu \u00e7oc","orospu\u00e7ocu\u011fu","orospu \u00e7ocu\u011fu","orospu \u00e7ocu\u011fudur","orospu \u00e7ocuklar\u0131","orospudur","orospular","orospunun",
"orospunun evlad\u0131","orospuydu","orostoban","orostopol","orrospu","oruspu","oruspu\u00e7ocu\u011fu","oruspu \u00e7ocu\u011fu","osbir",
"\u00f6k\u00fcz","\u00f6\u015fex","penis","pezevengin evlad\u0131","pezevenk","pic","pici","picler",
"pi\u00e7","pi\u00e7in o\u011flu","pi\u00e7 kurusu","pi\u00e7ler","porno","pussy","pu\u015ft","pu\u015fttur","s1kerim","s1kerm","s1krm",
"sakso","saksofon","saxo","sekis","sevgi koyar\u0131m","sevi\u015felim","sexs","s\u0131\u00e7ar\u0131m","s\u0131\u00e7t\u0131\u011f\u0131m","s\u0131ecem","sicarsin","sik","sikdi",
"sikdi\u011fim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikesicenin","sikey","sikeydim","sikeyim","sikeym","siki","sikicem",
"sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmi\u015f","sikilsin","sikim","sikimde",
"sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","siki\u015f",
"siki\u015fen","siki\u015fme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin",
"siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt","sikti","siktigimin","siktigiminin","sikti\u011fim","sikti\u011fimin","sikti\u011fiminin","siktii","siktiim","siktiimin","siktiiminin",
"siktiler","siktim","siktim","siktimin","siktiminin","siktir","siktir et","siktirgit","siktir git","siktirir","siktiririm","siktiriyor","siktir lan","siktirolgit","siktir ol git","sittimin","sittir",
"skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokar\u0131m","sokarim","sokarm",
"sokarmkoduumun","sokay\u0131m","sokaym","sokiim","soktu\u011fumunun","sokuk","sokum","soku\u015f","sokuyum","sulaleni","s\u00fclaleni","s\u00fclalenizi","s\u00fcrt\u00fck","\u015ferefsiz",
"\u015f\u0131ll\u0131k","taaklarn","taaklarna","tasak","tassak","ta\u015fak","ta\u015f\u015fak","tipini s.k","tipinizi s.keyim","tiyniyat","toto\u015f","vajina",
"vajinan\u0131","veledizina","veled i zina","verdiimin","weledizina","xikeyim","yaaraaa","yalar\u0131m","yalarun","yaraaam","yarak","yaraks\u0131z","yaraktr",
"yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraam\u0131","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarra\u011f",
"yarra\u011f\u0131m","yarra\u011f\u0131m\u0131","yarraimin","yarrak","yarram","yarramin","yarraminba\u015f\u0131","yarramn","yarran","yarrana","yarrrak","yav\u015f","yav\u015fak",
"yav\u015fakt\u0131r","yavu\u015fak","y\u0131l\u0131\u015f\u0131k","yilisik","yogurtlayam","yo\u011furtlayam","yrrak","z\u0131kk\u0131m\u0131m","zigsin","zikeyim","zikiiim","zikiim",
"zikik","zikim","ziksiiin","ziksiin"];

const reklamlar = ["http://","https://","cdn.discordapp.com","discordapp.com","discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az"]
const inviteEngel = new RegExp(/(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i);

module.exports = async (message) => {
    if(message.webhookID || message.author.bot || message.channel.type === ChannelType.DM) return;
    if (await client.checkPermission(client, message.author.id, "full") || await client.checkPermission(client, message.author.id, "chatguard")) return;
    if ((message.mentions.roles.size + message.mentions.users.size + message.mentions.channels.size) >= 3) return sendChat(message, "Birden çok kişiyi etiketlemekten vazgeçiniz")

    if (allah.Guard.kufurEngel && küfürler.some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(message.content))) return sendChat(message, "Umarım küfür etmedin yoksa sikerim belanı güzel kardeşim küfür senin o güzel diline hiç yakışıyormu ayıp edep erkan öğrenin az")

    if(message.content && message.content.length && message.content.length >= 165)  return sendChat(message, "Bro bak bu mesaj çok uzun tamam mı romanmı yazdın lütfen uzun mesaj göndermemeye özen gösteriniz")
    const Caps = (message.content.match(/[A-ZĞÇÖIÜ]/gm) || []).length;
    if ((allah.Guard.capsEngel) && (Caps / message.content.length) >= 0.7) return sendChat(message, "Caps-Lock kullanmayı lütfen azaltalım")

    if (allah.Guard.reklamEngel && message.content.match(inviteEngel)) {
        const invites = await message.guild.invites.fetch();
        if ((message.guild.vanityURLCode && message.content.match(inviteEngel).some((i) => i === message.guild.vanityURLCode)) || invites.some((x) => message.content.match(inviteEngel).some((i) => i === x))) return;
        return sendChat(message, "Lütfen reklam yapmayı bırakınız")
    }

    if(allah.Guard.reklamEngel && reklamlar.some(word => message.content.toLowerCase().includes(word))) return sendChat(message, "Lütfen reklam yapmayı bırakınız")
}

module.exports.conf = {
    name: "messageCreate",
};

client.on("messageCreate", async (message) => {
  if(message.webhookID || message.author.bot || message.channel.type === ChannelType.DM) return;
  if (await client.checkPermission(client, message.author.id, "full") || await client.checkPermission(client, message.author.id, "chatguard")) return;
  if (allah.Guard.spamEngel == false) return;

    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const {lastMessage, timer} = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        
            if(difference > DIFF) {
                clearTimeout(timer);
                userData.msgCount = 1;
                userData.lastMessage = message;
                    userData.timer = setTimeout(() => {
                        usersMap.delete(message.author.id);
                    }, TIME);
                usersMap.set(message.author.id, userData)
            } else {
                    msgCount++;
                    if(parseInt(msgCount) === LIMIT) {
                        sonMesajlar(message, 30)
                        usersMap.delete(message.author.id);
                        await message.reply({content: `Sohbet kanallarını anasın ıhmm pardon kirletme sebebiyle \`3 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. ${message.member}`}).then(x => setTimeout(() => {
                            x.delete().catch(err => {})
                        }, 7500)).catch(err => {})
                        const duration = "3m" ? ms("3m") : undefined;
                        return client.penalize(message.guild.id, message.author.id, "CHAT-MUTE", true, client.user.id, "Metin Kanallarında Flood Yapmak!", true, Date.now() + duration);
                     } else {
          userData.msgCount = msgCount;
          usersMap.set(message.author.id, userData)
        }}}
         else{
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id)
        }, TIME);
        usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
        
        })
        }
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if(newMessage.webhookID || newMessage.author.bot || newMessage.channel.type === ChannelType.DM) return;
    if (await client.checkPermission(client, newMessage.author.id, "full") || await client.checkPermission(client, newMessage.author.id, "chatguard")) return;
    if (newMessage.channel.id == kanallar.photoChatKanalı && newMessage.attachments.size < 1) await message.delete();
    if (allah.Guard.kufurEngel && küfürler.some(word => new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(newMessage.content))) newMessage.delete().catch(err => {});
    if (newMessage.content.replace(capsEngel, "").length >= newMessage.content.length / 2) {
        if (newMessage.content.length <= 15) return;
        if (newMessage.deletable) newMessage.delete().catch(err => err);
    }
    if (allah.Guard.reklamEngel && newMessage.content.match(inviteEngel)) {
        const invites = await newMessage.guild.invites.fetch();
        if ((newMessage.guild.vanityURLCode && newMessage.content.match(inviteEngel).some((i) => i === newMessage.guild.vanityURLCode)) || invites.some((x) => newMessage.content.match(inviteEngel).some((i) => i === x))) return;
        return newMessage.delete().catch(err => {});
    }
    if(allah.Guard.kufurEngel && reklamlar.some(word => newMessage.content.toLowerCase().includes(word))) return newMessage.delete().catch(err => {})
});

    async function sendChat(message, content) {
        if ((Number(getLimit.get(`${message.member.id}`))) == 3) {
            message.delete().catch(err => {})
            getLimit.delete((Number(getLimit.get(`${message.member.id}`))))
            await message.channel.send({content: `${message.member} Sohbet kanallarında ki kurallara uymadığın için \` 10 Dakika \` susturuldun.`}).then(x => setTimeout(() => {
                x.delete().catch(err => {})
            }, 7500)).catch(err => {})
            const duration = "10m" ? ms("10m") : undefined;
            client.guilds.cache.get(allah.GuildID).members.cache.get(message.member.id).roles.add(setup.chatMute)
            return client.penalize(message.guild.id, message.member.id, "CHAT-MUTE", true, client.user.id, "Metin Kanallarında kurallara uymamak.", true, Date.now() + duration);
        } else {
            getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
            message.delete().catch(err => {})
            let embed = new EmbedBuilder().setColor("Random")
            message.channel.send({content: `${message.member}`, embeds: [embed.setColor("Random").setDescription(`**Merhaba!** ${message.member.user.tag}
    Sohbet kanalında ${content}, aksi taktirde yaptırım uygulanacaktır.
        `)]}).then(x => {
                setTimeout(() => {
                    x.delete().catch(err => {})
                }, 6000);
            })
            setTimeout(() => {
                if(getLimit.get(`${message.member.id}`)) getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
              },10000)
        }
    } 

    async  function sonMesajlar(message, count = 25) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        let filtered = [...messages.filter((x) => x.author.id === message.author.id).values()].splice(0, count);
        message.channel.bulkDelete(filtered).catch(err => {});
    } 
    