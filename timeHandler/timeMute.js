const Timer = require("tiny-timer");
const timer = new Timer();
const { Client, Intents } = require("discord.js");
client = new Client({
  ws: { intents: Intents.ALL },
});


process.on("message", (msg) => {
  let mutedTime = msg;
  try {
    //stopwatch.start();
    console.log("Started mute on child!");
    //timer.start(mutedTime);
    /*
    setInterval(() => {

    }, 10000);
    */
    setTimeout(() => {
      process.send("All done!");
      //timer.stop();
      console.log("Done!");
    }, mutedTime);
  } catch (error) {
    console.log(`Uh Oh! The child spit out an error. Here it is! ${error}`);
  }
});
