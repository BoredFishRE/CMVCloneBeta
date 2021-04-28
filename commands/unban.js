const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "unhaha",
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
      let isnum = /^\d+$/.test(args[0]);
      let member = false;
      let checkMemberWork = false;
      //defines member. Switches between Mention and ID. Last one is smth I just have there.
      if (isnum == true) {
        checkMemberWork = true;
        member = await client.users.fetch(args[0]);
      } else {
        function getUserFromMention(mention) {
          if (mention.startsWith("<@") && mention.endsWith(">")) {
            mention = mention.slice(2, -1);

            if (mention.startsWith("!")) {
              mention = mention.slice(1);
            }

            return mention;
          }
        }
        member = getUserFromMention(args[0]);
        console.log(member);
      }
      //const member =
      //(await message.mentions.members.first()) ||
      //(await client.users.fetch(args[0]));
      if (member) {
        if (member == message.member) {
          message.channel.send(
            "Wai- wha- whaaaat?? Why are you trying to unban yourself? How are you here if you're banned?????????? You're confusing the hell out of me..."
          );
        } else {
          try {
            message.guild.members
              .unban(member)
              .then(() => {
                if (checkMemberWork == true) {
                  message.channel.send(`${member} was unbanned`);
                } else {
                  message.channel.send(`<@${member}> was unbanned`);
                }
              })
              .catch((error) => {
                message.channel.send(
                  "That member is probably already unbanned..."
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
