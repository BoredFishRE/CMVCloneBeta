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
const Op = Sequelize.Op;

module.exports = {
  name: "mutes",
  description: "Gets mutes for a member",
  aliases: ["listMutes", "listmutes", "listmute", "listMute"],
  execute(message, args, client) {
    //Ignore this, just the error displayer.
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/@/g, "" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    let muteLogging = "muteLogging";
    moderationLogging.tableName = muteLogging;
    //Gets guild for member ID
    let guild = message.guild;
    //Checks if executor is actually mod.
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Allows magic to happen"
      )
    ) {
      //Defines member. Switches from Mention and ID. Last one is useless.
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.get(args);
      //Checks if they actually mentioned someone/user exists
      if (member) {
        try {
          //Displays Member info in Console.
          console.log(member);
          async function warnGet() {
            let msgArgs = message.content.split(" ");
            var ReportID = Math.floor(1000 + Math.random() * 9000);
            let messageReason = msgArgs[2]
              ? message.content.substring(
                  msgArgs.slice(0, 3).join(" ").length + 1
                )
              : "No reason provided";
            (async () => {
              try {
                let userTag = member.user.tag;
                let warningYes = JSON.stringify(
                  await moderationLogging.findAll(
                    {
                      where: {
                        Member: userTag,
                      },
                    },
                    { raw: true }
                  )
                );
                const warning = JSON.parse(warningYes);
                const faqembed = new MessageEmbed()
                  .setColor("#ff0000")
                  .setAuthor(
                    member.user.username,
                    member.user.displayAvatarURL({
                      format: "jpg",
                      dynamic: "true",
                    })
                  );
                let isRun = false;
                warning.forEach((e, n) => {
                  faqembed.addField(
                    `Reason: ${warning[n].Reason}`,
                    `Report ID: ${warning[n].ReprtID}`
                  );
                  isRun = true;
                });
                if (isRun === true) {
                  message.channel.send(faqembed);
                } else if (isRun === false) {
                  message.channel.send(
                    `${member} has not been muted. Check P roles though.`
                  );
                }
              } catch (error) {
                message.channel.send(
                  `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
                    error
                  )}\n\`\`\``
                );
                console.log(error);
              }
            })();
          }
          warnGet();
          //Error Handler.
        } catch (error) {
          message.channel.send(
            `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
              error
            )}\n\`\`\``
          );
          console.log(error);
        }
        //Error if user didn't mention/give ID of a user OR if user doesn't exist.
      } else if (!member) {
        console.log(member);
        message.channel.send(
          "You need to actually like put the person you want in the message, otherwise I can't do crap."
        );
      }
    } else {
      //Generates random number
      var reprtIDJoke = Math.floor(1000 + Math.random() * 9000);
      //Array of messages
      const modMessage = [
        "You ain't no mod. Get outta here man.",
        "Well, this is awkward. So, you're not a mod, but you're trying to do mod stuff, but you can't do that, so I can't do my thing... Welp. Time to sit in the void until someone calls for me again.",
        "Bro, what are you doing? You aren't a mod man! Why are you trying it?",
        "You're' getting cancelled for doing that",
        "What are you doing stepbro?",
        "Why are you running? You ain't no mod, so don't try it again!",
        `This unauthorised usage of mod commands has been reported to feiks with ReportID #${reprtIDJoke}`,
        "Leave me alone man, I can't do that.",
        "a",
        "Do not cite the deep magic to me witch, I was there when it was written.",
      ];
      //Selects random message
      const random = Math.floor(Math.random() * modMessage.length);
      const randomMessage = modMessage[random];
      //Sends random message.
      message.channel.send(randomMessage);
    }
  },
};
