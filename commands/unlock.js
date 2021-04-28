const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks Channel",
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
      let channel = message.channel;
      let everyone = message.guild.roles.cache.find(
        (r) => r.name === "@everyone"
      );
      let perms = channel.permissionsFor(everyone).serialize();
      if (!perms.SEND_MESSAGES) {
        channel.updateOverwrite(
          channel.guild.roles.everyone,
          { SEND_MESSAGES: null },
          `Locked by ${message.author.tag}`
        );
        let lockEmbed = new MessageEmbed()
        .setColor("#ff0000")
          .addField("This channel has been unlocked!", "Please don't spam...")
          .setAuthor(
            `Unlocked by ${message.author.username}`,
            message.author.displayAvatarURL({
              format: "jpg",
              dynamic: "true",
            })
          );
        message.channel.send(lockEmbed);
      } else if (perms.SEND_MESSAGES) {
        let lockEmbedFalse = new MessageEmbed()
          .setColor("#ff9100")
          .addField(
            "This channel is already unlocked!",
            "What are you doing???"
          )
          .setAuthor(
            `Bruh Moment by ${message.author.username}`,
            message.author.displayAvatarURL({
              format: "jpg",
              dynamic: "true",
            })
          );
        message.channel.send(lockEmbedFalse);
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
