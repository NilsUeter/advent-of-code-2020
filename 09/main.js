fs = require("fs");
console.time();
const input = fs.readFileSync("input.txt", "utf8").split("\r\n").map(Number);

const checkIsValid = (preamble, index) => {
  for (let i = index - preamble; i < index; i++) {
    for (let k = index - preamble; k < index; k++) {
      if (i !== k && input[i] + input[k] === input[index]) {
        return true;
      }
    }
  }
  return false;
};
const part1 = (preamble) => {
  for (let i = preamble; i < input.length; i++) {
    if (!checkIsValid(preamble, i)) {
      return input[i];
    }
  }
};
const invalidNumber = part1(25);
console.log("Part 1: " + invalidNumber);

const part2 = () => {
  for (let startIndex = 0; startIndex < input.length; startIndex++) {
    let endIndex = startIndex;
    let sum = 0;
    while (sum < invalidNumber) {
      sum += input[endIndex];
      endIndex++;
    }
    if (sum === invalidNumber) {
      const continuousSet = input.slice(startIndex, endIndex);
      return Math.min(...continuousSet) + Math.max(...continuousSet);
    }
  }
};
console.log("Part 2: " + part2());
console.timeEnd();
