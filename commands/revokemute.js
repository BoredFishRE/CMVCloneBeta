const { MessageEmbed } = require("discord.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: console.log,
  // SQLite only
  storage: "moderationstore.sqlite",
});
const moderationLogging = sequelize.define("moderationstore.sqlite", {
  ReprtID: {
    type: Sequelize.STRING,
    unique: false,
    primaryKey: true,
  },
  Member: Sequelize.TEXT,
  Reason: Sequelize.TEXT,
});

module.exports = {
  name: "removemute",
  description: "Deletes a logged mute.",
  aliases: ["rm"],
  execute(message, args, client) {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/@/g, "" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    let muteLogging = "muteLogging";
    moderationLogging.tableName = muteLogging;
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Allows magic to happen"
      )
    ) {
      try {
        let messageReason = args[0];
        let argsLength = messageReason.length;
        let isnum = /^\d+$/.test(messageReason);
        if (argsLength == 5 && isnum) {
          moderationLogging
            .destroy({ where: { ReprtID: messageReason } })
            .then(() => {
              message.channel.send(`Deleted report ID ${messageReason}`);
            })
            .catch((error) => {
              message.channel.send("Invalid Report ID");
              console.log(error);
            });
        } else {
          message.channel.send("Invalid Report ID");
        }
      } catch (error) {
        message.channel.send(
          `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
            error
          )}\n\`\`\``
        );
        console.log(error);
      }
    } else {
      var reprtID = Math.floor(1000 + Math.random() * 9000);
      const modMessage = [
        "You ain't no mod. Get outta here man.",
        "Well, this is awkward. So, you're not a mod, but you're trying to do mod stuff, but you can't do that, so I can't do my thing... Welp. Time to sit in the void until someone calls for me again.",
        "Bro, what are you doing? You aren't a mod man! Why are you trying it?",
        "You're' getting cancelled for doing that",
        "What are you doing stepbro?",
        "Why are you running? You ain't no mod, so don't try it again!",
        `This unauthorised usage of mod commands has been reported to feiks with ReportID #${reprtID}`,
        "Leave me alone man, I can't do that.",
        "a",
        "Do not cite the deep magic to me witch, I was there when it was written.",
      ];
      const random = Math.floor(Math.random() * modMessage.length);
      const randomMessage = modMessage[random];
      message.channel.send(randomMessage);
    }
  },
};
