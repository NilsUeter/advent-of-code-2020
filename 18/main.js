fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .replaceAll(" ", "")
  .split("\r\n");

const useOperator = (currentValue, lastOperator, value) => {
  switch (lastOperator) {
    case "+":
      return currentValue + value;
    case "*":
      return currentValue * value;
  }
};

const findEndOfParentheses = (part, start) => {
  let openBrackets = 0;
  for (let i = start; i < part.length; i++) {
    if (part[i] === "(") {
      openBrackets++;
    } else if (part[i] === ")") {
      if (openBrackets === 1) {
        return i;
      }
      openBrackets--;
    }
  }
};

const calculate = (part) => {
  let value = 0;
  let operator = "+";
  for (let i = 0; i < part.length; i++) {
    switch (part[i]) {
      case "(":
        value = useOperator(value, operator, calculate(part.slice(i + 1)));
        i = findEndOfParentheses(part, i);
        break;
      case ")":
        return value;
      case "+":
        operator = "+";
        break;
      case "*":
        operator = "*";
        break;
      default:
        value = useOperator(value, operator, parseInt(part[i]));
        break;
    }
  }
  return value;
};

const part1 = () => {
  let sum = 0;
  for (const line of input) {
    sum += calculate(line);
  }
  return sum;
};
console.log("Part 1: " + part1());

const divideInPartsAndCalculate = (part) => {
  let partsWithoutParentheses = [];
  for (let i = 0; i < part.length; i++) {
    if (part[i] === "(") {
      const end = findEndOfParentheses(part, i);
      partsWithoutParentheses.push(
        divideInPartsAndCalculate(part.slice(i + 1, end))
      );
      i = end;
    } else {
      partsWithoutParentheses.push(part[i]);
    }
  }

  let partsWithoutAddition = [];
  for (let i = 0; i < partsWithoutParentheses.length; i++) {
    if (partsWithoutParentheses[i + 1] === "+") {
      let plusSnakeCounter = 1;
      let sum = parseInt(partsWithoutParentheses[i]);
      while (partsWithoutParentheses[i - 1 + 2 * plusSnakeCounter] === "+") {
        sum += parseInt(partsWithoutParentheses[i + 2 * plusSnakeCounter]);
        plusSnakeCounter++;
      }
      plusSnakeCounter--;
      partsWithoutAddition.push(sum);
      i += 2 * plusSnakeCounter;
    } else {
      partsWithoutAddition.push(partsWithoutParentheses[i]);
    }
  }

  return eval(partsWithoutAddition.join(""));
};

const part2 = () => {
  let sum = 0;
  for (const line of input) {
    sum += divideInPartsAndCalculate(line);
  }
  return sum;
};
console.log("Part 2: " + part2());
