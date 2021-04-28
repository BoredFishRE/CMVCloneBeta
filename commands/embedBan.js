const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "embedban",
  description: "Embedbans a member.",
  execute(message, args, client) {
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/@/g, "" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    let guild = message.guild;
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Allows magic to happen"
      )
    ) {
      //This really works the same way as warn.js. If you wanna find out how it works, go to warn.js.
      const ms = require("ms");
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.get(args);
      if (member) {
        if (member == message.member) {
          message.channel.send(
            "Bruh don't embed ban yourself. That's kinda dumb..."
          );
        } else {
          if (
            member.roles.cache.find((r) => r.name === "Allows magic to happen.")
          ) {
            message.channel.send("Bruh don't embed ban a fellow mod. Rude...");
          } else {
            try {
              let mutedRole = message.member.roles.cache.some(
                (role) => role.name === "embed banned"
              );
              console.log(member);
              const muteEmbed = new MessageEmbed()
                .setColor("#ff0000")
                .setAuthor(
                  member.user.username,
                  member.user.displayAvatarURL({
                    format: "jpg",
                    dynamic: "true",
                  })
                );
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
                let muteReason =
                  args.slice(2).join(" ") || "No reason provided";
                if (units.includes(args[2])) {
                  muteTimeRaw = args.slice(1, 3).join(" ");
                  muteReason = args.slice(3).join(" ");
                }
                let mutedTime = ms(muteTimeRaw);
                let embedRole = message.guild.roles.cache.get(
                  "834797120682328094"
                );
                let checkTime = muteTimeRaw.includes("OuttaTime");

                switch (checkTime) {
                  case true:
                    member.roles.add(embedRole);
                    muteEmbed.addField(
                      `${member.user.tag} was Embed Banned by ${message.author.username} for an undefined time.`,
                      `Haha.`
                    );
                    break;
                  default:
                    member.roles.add(embedRole);
                    muteEmbed.addField(
                      `${member.user.tag} was embed banned by ${message.author.username}.`,
                      `Embed Banned for ${muteTimeRaw}.`
                    );
                    setTimeout(() => {
                      member.roles.remove(embedRole); // remove the role
                    }, mutedTime);
                }
              }
              muteMember();
              message.channel.send(muteEmbed);
            } catch (error) {
              message.channel.send(
                `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
                  error
                )}\n\`\`\``
              );
              console.log(error);
            }
          }
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
