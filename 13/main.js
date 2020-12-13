fs = require("fs");
const [earliestDepatureRaw, rawInput] = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n");

const earliestDepature = parseInt(earliestDepatureRaw, 10);
const input = rawInput
  .split(",")
  .filter((e) => e !== "x")
  .map(Number);

const part1 = () => {
  let earliestBusID;
  let waitTime = 0;
  while (!earliestBusID) {
    for (const busID of input) {
      if ((earliestDepature + waitTime) % busID === 0) {
        return busID * waitTime;
      }
    }
    waitTime++;
  }
};
console.log("Part 1: " + part1());

const input2 = rawInput
  .split(",")
  .map((e, index) => {
    return { id: parseInt(e, 10), neededDelay: index };
  })
  .filter(({ id }) => !Number.isNaN(id));

const part2 = () => {
  let timeStamp = 0;
  let commonInterval = 1;
  for (const { id, neededDelay } of input2) {
    while (true) {
      if ((timeStamp + neededDelay) % id === 0) {
        commonInterval *= id;
        break;
      }
      timeStamp += commonInterval;
    }
  }
  return timeStamp;
};
console.log("Part 2: " + part2());
