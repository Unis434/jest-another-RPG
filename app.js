const Game = require("./lib/Game");
const arg = process.argv[2];
const version = "1.0.0";

// Display Argument Data
if (arg === "-h") {
  console.log(`
    Usage: node app.js [ -h | -v | -l | -a ]
    [options]
    -h          Display this message.
    -v          Show version.
    -l          Show license info.
    -a          What is jest-another-RPG?
`);
} else if (arg === "-v") {
  console.log("jest-another-RPG Version: " + version + ".");
} else if (arg === "-l") {
  console.log(
    "Published under the Creative Commons Zero v1.0 Universal License."
  );
} else if (arg === "-a") {
  console.log(
    "Command line RPG written in Node.js following the Test Driven Development model with jest."
  );
} else {
  new Game().initializeGame();
}
