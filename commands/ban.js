const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "haha",
  async execute(message, args, client) {
    //ignore this, it's just the error displayer.
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/@/g, "" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    //defines guild for member so ID fetching works.
    let guild = message.guild;
    //checks if executor is actually mod, runs program if true.
    if (
      message.member.roles.cache.some(
        (role) => role.name === "Allows magic to happen"
      )
    ) {
      let checkingthings = false;
      //defines member. Switches between Mention and ID. Last one is smth I just have there.
      const member =
        (await message.mentions.members.first()) ||
        (await message.guild.members.cache.get(args[0])) ||
        (await message.guild.members.cache.get(args));
      if (member) {
        if (member == message.member) {
          message.channel.send("Bruh don't ban yourself. That's kinda dumb...");
        } else {
          if (
            member.roles.cache.find((r) => r.name === "Allows magic to happen")
          ) {
            message.channel.send("Bruh don't ban a fellow mod. Rude...");
          } else {
            let msgArgs = message.content.split(" ");
            var ReportID = Math.floor(10000 + Math.random() * 90000);
            let messageReason = msgArgs[2]
              ? message.content.substring(
                  msgArgs.slice(0, 2).join(" ").length + 1
                )
              : "No reason provided";
            try {
              await member
                .send(
                  `You've been banned from CarMightyVids Community Server for the reason: ${messageReason}`
                )
                .then(() => {
                  member.send(
                    "https://cdn.discordapp.com/attachments/704776253437116498/837069547378442340/youvebeenbanned.gif"
                  );
                })
                .catch((error) => {
                  message.channel.send("Couldn't DM that user.");
                });

              member
                .ban({ reason: messageReason })
                .then(() => {
                  message.channel.send(
                    `${member} was banned for the reason: ${messageReason}`
                  );
                })
                .catch((error) => {
                  message.channel.send(
                    "That member is probably already banned..."
                  );
                });
            } catch (error) {
              //Error handler
              message.channel.send(
                `Aw maaaaan. I couldn't do the thing I needed to do. <@388813100964642816> should prob know about this. The technical stuff\` \`\`\`xl\n${clean(
                  error
                )}\n\`\`\``
              );
              console.log(error);
            }
          }
        }
        //Checks if the person actually mentioned someone/put ID down.
      } else if (!member) {
        message.channel.send(
          "You gonna ban someone? Or are you testing perms. If you're just testing perms, I'll leave you alone... probably not I can't tell if you've already run this command."
        );
      }
    } else {
      //Random number generator.
      var reprtID = Math.floor(1000 + Math.random() * 9000);
      //Array of messages it can choose.
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
      //Selects message
      const random = Math.floor(Math.random() * modMessage.length);
      const randomMessage = modMessage[random];
      //Sends Message.
      message.channel.send(randomMessage);
    }
  },
};
