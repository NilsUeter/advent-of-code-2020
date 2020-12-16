fs = require("fs");

const [rulesRaw, yourTicketRaw, nearbyTicketRaw] = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n\r\n");
const rules = rulesRaw.split("\r\n").map((e) => {
  const [ruleName, ruleParts] = e.split(": ");
  return [
    ruleName,
    ruleParts.split(" or ").map((e) => e.split("-").map(Number)),
  ];
});
const [, yourTicket] = yourTicketRaw
  .split("\r\n")
  .map((e) => e.split(",").map(Number));
const [, ...nearbyTickets] = nearbyTicketRaw
  .split("\r\n")
  .map((e) => e.split(",").map(Number));

const validForAnyField = (number) => {
  for (const [, rulePart] of rules) {
    for (const [min, max] of rulePart) {
      if (min <= number && number <= max) {
        return true;
      }
    }
  }
  return false;
};

let invalidTicketsIndixes = new Set();
const part1 = () => {
  let ticketScanningErrorRate = 0;
  for (const [index, ticket] of nearbyTickets.entries()) {
    for (const value of ticket) {
      if (!validForAnyField(value)) {
        ticketScanningErrorRate += value;
        invalidTicketsIndixes.add(index);
      }
    }
  }
  return ticketScanningErrorRate;
};
console.log("Part 1: " + part1());

const isRuleValidForTicketsAtPosition = (rulePart, tickets, position) => {
  for (const ticket of tickets) {
    const value = ticket[position];
    if (!rulePart.some(([min, max]) => min <= value && value <= max)) {
      return false;
    }
  }
  return true;
};

const part2 = () => {
  const validTickets = nearbyTickets.filter(
    (_, index) => !invalidTicketsIndixes.has(index)
  );
  const indexToFieldMapping = {};
  const foundRules = new Set();
  while (foundRules.size < rules.length) {
    for (const [name, rulePart] of rules) {
      if (foundRules.has(name)) {
        continue;
      }
      const eligibleFields = [];
      for (let i = 0; i < yourTicket.length; i++) {
        if (indexToFieldMapping[i]) {
          continue;
        }
        if (isRuleValidForTicketsAtPosition(rulePart, validTickets, i)) {
          eligibleFields.push(i);
        }
      }
      if (eligibleFields.length === 1) {
        indexToFieldMapping[eligibleFields[0]] = name;
        foundRules.add(name);
      }
    }
  }

  return yourTicket
    .filter((_, index) => indexToFieldMapping[index].startsWith("departure"))
    .reduce((acc, current) => acc * current, 1);
};

console.log("Part 2: " + part2());
