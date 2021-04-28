const { MessageEmbed } = require("discord.js");
const { Sequelize } = require("sequelize");
const { fork } = require("child_process");

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
  Member: Sequelize.STRING,
  Reason: Sequelize.STRING,
});

module.exports = {
  name: "mute",
  description: "Mutes a member",
  aliases: ["addmute", "am"],
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
    let guild = message.guild;
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Allows magic to happen"
      )
    ) {
      //This really works the same way as warn.js. If you wanna find out how it works, go to warn.js.
      let P1 = message.guild.roles.cache.find((r) => r.name === "P1");
      let P2 = message.guild.roles.cache.find((r) => r.name === "P2");
      let P3 = message.guild.roles.cache.find((r) => r.name === "P3");
      let P4 = message.guild.roles.cache.find((r) => r.name === "P4");
      let P5 = message.guild.roles.cache.find((r) => r.name === "P5");
      const ms = require("ms");
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.get(args);
      if (member) {
        try {
          let mutedRole = message.member.roles.cache.some(
            (role) => role.name === "Muted"
          );
          let HasP1 = member.roles.cache.some((r) => r.name === "P1");
          let HasP2 = member.roles.cache.some((r) => r.name === "P2");
          let HasP3 = member.roles.cache.some((r) => r.name === "P3");
          let HasP4 = member.roles.cache.some((r) => r.name === "P4");
          let HasP5 = member.roles.cache.some((r) => r.name === "P5");
          console.log(member);
          const muteEmbed = new MessageEmbed().setColor("#ff0000").setAuthor(
            member.user.username,
            member.user.displayAvatarURL({
              format: "jpg",
              dynamic: "true",
            })
          );
          let channel = message.guild.channels.cache.get("836328776950087730");
          function muteMember() {
            let units = [
              "second",
              "minute",
              "hour",
              "day",
              "week",
              "month",
              "year",
            ];
            for (i = 0; i > units.length; i++) {
              let plural = [];
              plural = plural.push(units[i] + "s");
              console.log(plural);
            }
            //let msgArgs = message.content.split(" ");
            let muteTimeRaw = args[1] || "OuttaTime";
            let muteReason = args.slice(2).join(" ") || "No reason provided";
            if (units.includes(args[2])) {
              muteTimeRaw = args.slice(1, 3).join(" ");
              muteReason = args.slice(3).join(" ");
            }
            let mutedTime = ms(muteTimeRaw);
            let mutedRole = message.guild.roles.cache.get("833714274391949363");
            let checkTime = /^\d+$/.test(mutedTime);
            const muteTiming = fork("timeHandler/timeMute.js");
            switch (checkTime) {
              case true:
                member.roles.add(mutedRole);
                muteEmbed.addField(
                  `${member.user.tag} was muted by ${message.author.username}.`,
                  `Muted for ${muteTimeRaw}.`
                );
                member.send(
                  `You've been muted in CarMightyVids Community Server for the reason: ${messageReason} and for ${muteTimeRaw} long`
                );
                muteTiming.send(mutedTime);
                muteTiming.on("message", (msg) => {
                  if (msg === "All done!") {
                    member.roles.remove(mutedRole);
                  }
                });
                break;
              default:
                member.roles.add(mutedRole);
                muteEmbed.addField(
                  `${member.user.tag} was muted by ${message.author.username} for an undefined time.`,
                  `Reason: ${muteReason}.`
                );
            }
            var ReportID = Math.floor(10000 + Math.random() * 90000);
            try {
              var d = new Date(Date.now());
              let userTag = member.user.tag;
              moderationLogging.create({
                Member: userTag,
                ReprtID: ReportID,
                Reason: muteReason,
              });
              moderationLogging.sync();
              muteEmbed.addField(
                `Mute reason: \n ${muteReason}`,
                `Report ID: \n ${ReportID}`
              );
              muteEmbed.setFooter(`Performed At: ${d.toString()}`);
            } catch (error) {
              message.channel.send(
                `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
                  error
                )}\n\`\`\``
              );
              console.log(error);
            }
          }
          if (member == message.member) {
            message.channel.send(
              "Bruh don't mute yourself. That's kinda dumb..."
            );
          } else {
            if (
              member.roles.cache.find(
                (r) => r.name === "Allows magic to happen"
              )
            ) {
              message.channel.send("Bruh don't mute a fellow mod. Rude...");
            } else {
              if (member.roles.cache.find((r) => r.name === "Muted")) {
                muteEmbed.addField(
                  `Bro, ${member.user.tag} is already muted.`,
                  "Give them a break man..."
                );
                message.channel.send(muteEmbed);
              } else {
                switch (true) {
                  case HasP1:
                    member.roles.remove(P1);
                    member.roles.add(P3);
                    muteEmbed.addField(
                      `${member.user.tag} now has P3.`,
                      "Removed P1."
                    );
                    break;
                  case HasP2:
                    member.roles.remove(P2);
                    member.roles.add(P3);
                    muteEmbed.addField(
                      `${member.user.tag} now has P3.`,
                      "P2 removed."
                    );
                    break;
                  case HasP3:
                    member.roles.remove(P3);
                    member.roles.add(P4);
                    muteEmbed.addField(
                      `${member.user.tag} had P3`,
                      "Assigning P4."
                    );
                    break;
                  case HasP4:
                    muteEmbed.addField(
                      `${member.user.tag} has P4.`,
                      "No action was taken."
                    );
                    break;
                  case HasP5:
                    muteEmbed.addField(
                      `${member.user.tag} has P5.`,
                      `No action was taken.`
                    );
                    break;
                  default:
                    member.roles.add(P3);
                    muteEmbed.addField(
                      `${member.user.tag} now has P3.`,
                      "First mute as far as I know."
                    );
                }
                muteMember();
                message.channel.send(muteEmbed);
                channel.send(muteEmbed);
              }
            }
          }
        } catch (error) {
          message.channel.send(
            `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
              error
            )}\n\`\`\``
          );
          console.log(error);
        }
      } else if (!member) {
        console.log(member);
        message.channel.send(
          "You need to actually like put the person you want in the message, otherwise I can't do crap."
        );
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
