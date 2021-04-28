const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Mutes a member",
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
      const member =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.get(args);
      if (member) {
        try {
          console.log(member);
          const muteEmbed = new MessageEmbed().setColor("#ff0000").setAuthor(
            member.user.username,
            member.user.displayAvatarURL({
              format: "jpg",
              dynamic: "true",
            })
          );
          function muteMember() {
            let mutedRole = message.guild.roles.cache.get("833714274391949363");
            let hasMuted = member.roles.cache.some(
              (role) => role.name === "Muted"
            );
            switch (true) {
              case hasMuted:
                member.roles.remove(mutedRole);
                muteEmbed.addField(
                  `Removed mute for ${member.user.tag}`,
                  "Ery noice."
                );
                break;
              default:
                muteEmbed.addField(
                  `${member.user.tag} isn't muted. Maybe you said the wrong member?`,
                  "Bruh"
                );
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
