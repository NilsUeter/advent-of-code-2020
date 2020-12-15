fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8").split(",");

const calculateNthNumberSpoken = (N) => {
  const numbers = new Map(); // map performs much better than a normal object for this case
  for (let i = 0; i < input.length; i++) {
    numbers.set(input[i], i + 1);
  }
  let lastNumberSpoken;
  for (let turn = input.length + 1; turn <= N; turn++) {
    if (numbers.has(lastNumberSpoken)) {
      const temp = `${turn - 1 - numbers.get(lastNumberSpoken)}`;
      numbers.set(lastNumberSpoken, turn - 1);
      lastNumberSpoken = temp;
    } else {
      numbers.set(lastNumberSpoken, turn - 1);
      lastNumberSpoken = "0";
    }
  }
  return lastNumberSpoken;
};
console.log("Part 1: " + calculateNthNumberSpoken(2020));

console.log("Part 2: " + calculateNthNumberSpoken(30000000));
