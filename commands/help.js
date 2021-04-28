const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "List all of my commands or info about a specific command.",
  aliases: ["commands"],
  execute(message, args) {
    let checkArgs = args == "moderation";
    switch (checkArgs) {
      case true:
        const helpEmbed = new MessageEmbed()
          .setColor("#ff0000")
          .setTitle("Moderation Commands")
          .addField(
            "ban",
            "Bans a member. \n Usage: *ban [mention/ID] [reason]",
            true
          )
          .addField(
            "embedBan",
            "Embed bans a member. \n Usage: *embedban [mention/ID]",
            true
          )
          .addField(
            "kick",
            "Kicks a member. \n Usage: *kick [mention/ID]",
            true
          )
          .addField("lock", "Locks a channel. \n Usage: *lock", true)
          .addField(
            "mute",
            "Mutes a member. \n Usage: *mute [mention/ID] [Reason]",
            true
          )
          .addField(
            "mutes",
            "Lists mutes for a member. \n Usage: *mutes [mention/ID]",
            true
          )
          .addField(
            "purge",
            "Purges X amount of messages that are less than 14 days old. \n Usage: *purge [amount of messages]",
            true
          )
          .addField(
            "revokePRole",
            "Incriments P role down one. \n Usage: *revokePRole [mention/ID]",
            true
          )
          .addField(
            "removewarn",
            "Removes a saved warning. \n Usage: *removewarn [ReportID]",
            true
          )
          .addField(
            "unlock",
            "Unlocks a locked channel. \n Usage: *unlock",
            true
          )
          .addField(
            "warn",
            "Warns a member while incrimenting up one P role. \n Usage: *warn [mention/ID] [reason]",
            true
          )
          .addField(
            "warnings",
            "Lists warnings for a member. \n Usage: *warnings [mention/ID]",
            true
          )
          .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({ format: "gif", dynamic: "true" })
          );
        message.channel.send(helpEmbed);
        break;
      default:
        const helpEmbed1st = new MessageEmbed()
          .setColor("#ff0000")
          .addField("about", "About the bot.", true)
          .addField("hack", ";)", true)
          .addField("help", "This command! \n Usage: *help", true)
          .addField("Serverinfo", "Lists info about server. \n Usage: b*serverinfo", true)
          .addField("Userinfo", "Shows info about a user. \n Usage: b*userinfo [mention/ID]", true)
          .addField(
            "For moderation commands do *help moderation",
            "Ex: *help moderation"
          )
          .setFooter(
            "Requested by " + message.author.username,
            message.author.displayAvatarURL({ format: "gif", dynamic: "true" })
          );
        message.channel.send(helpEmbed1st);
    }
  },
};
