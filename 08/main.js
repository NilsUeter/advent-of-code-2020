fs = require("fs");

let unparsedInput = fs.readFileSync("input.txt", "utf8");
const input = unparsedInput.split("\r\n").map((e) => {
  const [command, value] = e.split(" ");
  return { command, value: +value };
});

const part1 = () => {
  let accumulator = 0;
  let visitedCommands = new Set();
  for (let i = 0; i < input.length; ) {
    if (visitedCommands.has(i)) {
      return { terminated: false, accumulator };
    }
    visitedCommands.add(i);
    const { command, value } = input[i];
    switch (command) {
      case "nop":
        i++;
        break;
      case "acc":
        accumulator += value;
        i++;
        break;
      case "jmp":
        i += value;
        break;
      default:
        break;
    }
  }
  return { terminated: true, accumulator };
};
console.log("Part 1: " + part1().accumulator);

const switchJmpAdnNop = (index) => {
  if (input[index].command === "jmp") {
    input[index].command = "nop";
  } else {
    input[index].command = "jmp";
  }
};

const part2 = () => {
  for (let i = 0; i < input.length; i++) {
    if (input[i].command === "acc") {
      continue;
    }
    switchJmpAdnNop(i);

    const result = part1();
    if (result.terminated) {
      return result.accumulator;
    }

    switchJmpAdnNop(i);
  }
};
console.log("Part 2: " + part2());
