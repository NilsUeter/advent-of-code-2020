fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((e) => {
    if (e.includes("mask = ")) {
      return e.split("mask = ")[1];
    }
    const splitElement = e.split("mem[").join("").split("] = ");
    return {
      address: parseInt(splitElement[0]),
      value: BigInt(parseInt(splitElement[1])),
    };
  });

const part1 = () => {
  let maskOverwriteOnes;
  let maskOverwriteZeroes;
  const memory = {};
  for (const line of input) {
    const { address, value } = line;
    if (address) {
      memory[address] = value;
      memory[address] |= maskOverwriteOnes; // overwrites only 1's
      memory[address] &= maskOverwriteZeroes; // overwrites only 0's
    } else {
      maskOverwriteOnes = BigInt(parseInt(line.replaceAll("X", 0), 2));
      maskOverwriteZeroes = BigInt(parseInt(line.replaceAll("X", 1), 2));
    }
  }
  return Object.values(memory).reduce((acc, current) => acc + current, 0n);
};
console.log("Part 1: " + part1());

function shiftify(values) {
  return values.map((v) => v << 1n);
}

function oneify(values) {
  return values.map((v) => v | 1n);
}

const part2 = () => {
  let mask;
  const memory = {};
  for (const line of input) {
    const { address, value } = line;
    if (address) {
      const addressBinarString = address.toString(2).padStart(36, "0");
      let addresses = [0n];
      [...mask].forEach((element, index) => {
        addresses = shiftify(addresses);
        if (element === "X") {
          addresses = [...addresses, ...oneify(addresses)];
        } else if (element === "1" || addressBinarString[index] === "1") {
          addresses = oneify(addresses);
        }
      });
      addresses.forEach((a) => {
        memory[a] = value;
      });
    } else {
      mask = line;
    }
  }
  return Object.values(memory).reduce((acc, current) => acc + current, 0n);
};
console.log("Part 2: " + part2());
