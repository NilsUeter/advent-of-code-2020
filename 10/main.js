fs = require("fs");
console.time();
const lines = fs
  .readFileSync("input.test.txt", "utf8")
  .split("\r\n")
  .map(Number)
  .sort((a, b) => a - b);
const input = [0, ...lines, lines[lines.length - 1] + 3];

const part1 = () => {
  const differences = {};
  for (let i = 0; i < input.length - 1; i++) {
    const difference = Math.abs(input[i] - input[i + 1]);
    differences[difference] = differences[difference] + 1 || 1;
  }
  return differences[1] * differences[3];
};
console.log("Part 1: " + part1());

const getPermutations = (length) => {
  return Array.from({ length }).reduce((acc, _, i) => acc + i, 1);
};

const part2 = () => {
  let contiguousOnes = [0];
  for (let i = 0; i < input.length - 1; i++) {
    const difference = Math.abs(input[i] - input[i + 1]);
    if (difference === 1) {
      contiguousOnes[contiguousOnes.length - 1] += 1;
    } else if (difference === 3) {
      contiguousOnes.push(0);
    }
  }
  const arrangements = contiguousOnes
    .map(getPermutations)
    .reduce((acc, current) => acc * current, 1);
  return arrangements;
};
console.log("Part 2: " + part2());
console.timeEnd();
