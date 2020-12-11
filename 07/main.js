fs = require("fs");

let unparsedInput = fs.readFileSync("input.txt", "utf8");
const rules = unparsedInput
  .replaceAll(".", "")
  .replaceAll(" bags", " bag")
  .split("\r\n")
  .map((e) => e.split(" contain "))
  .reduce((acc, e) => {
    acc[e[0]] = e[1]
      .split(", ")
      .map((e) => {
        if (e === "no other bag") {
          return e;
        }
        return { color: e.slice(2), quantity: +e.slice(0, 2) };
      })
      .filter((e) => e !== "no other bag");
    return acc;
  }, {});

const recursivelyCheckFor = (bagColor, target) => {
  const insides = rules[bagColor];
  for (const bag of insides) {
    if (bag.color === target) {
      return true;
    }
    if (recursivelyCheckFor(bag.color, target)) {
      return true;
    }
  }
};

const part1 = (target) => {
  let colorsThatCanContainTarget = 0;
  for (const bagColor in rules) {
    colorsThatCanContainTarget += recursivelyCheckFor(bagColor, target) ? 1 : 0;
  }
  return colorsThatCanContainTarget;
};
console.log("Part 1: " + part1("shiny gold bag"));

const memoizedBags = {};
const recursivelyCountBags = (bagColor) => {
  if (memoizedBags[bagColor]) {
    return memoizedBags[bagColor];
  }
  let counter = 0;
  const insides = rules[bagColor];
  for (const bag of insides) {
    counter += bag.quantity + bag.quantity * recursivelyCountBags(bag.color);
  }
  memoizedBags[bagColor] = counter;
  return counter;
};

const part2 = () => {
  return recursivelyCountBags("shiny gold bag");
};
console.log("Part 2: " + part2());
