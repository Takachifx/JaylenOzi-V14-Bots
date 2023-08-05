let allah = require('./config.json');

let botcuk = [
      {
        name: `${allah.GuildName}_Moderation`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Main/JaylenOzi-Moderation"
      },
      {
        name: `${allah.GuildName}_Voucher`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Main/JaylenOzi-Register"
      },
      {
        name: `${allah.GuildName}_Statistics`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Main/JaylenOzi-Statistics"
      },
      {
        name: `${allah.GuildName}_Guard_I`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Guard/Guard_I"
      },
      {
        name: `${allah.GuildName}_Guard_II`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Guard/Guard_II"
      },
      {
        name: `${allah.GuildName}_Guard_III`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Guard/Guard_III"
      }
    ]

  if(allah.Destek.Active) {
    botcuk.push(
      {
        name: `${allah.GuildName}_Destek`,
        namespace: `${allah.GuildName}`,
        script: 'ozi.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Destek"
      }
    )
  }
  if(allah.Welcome.Active) {
    botcuk.push(
      {
        name: `${allah.GuildName}_Welcomes`,
        namespace: `${allah.GuildName}`,
        script: 'Start.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./JaylenOzi-Bots/JaylenOzi-Welcome"
      }
    )
  }

  module.exports = {
    apps: botcuk
  };