fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((e) => {
    const [action, value] = [e.slice(0, 1), parseInt(e.slice(1), 10)];
    return { action, value };
  });

const directions = ["N", "E", "S", "W"];

let x = 0;
let y = 0;
let direction = "E";
const getNewDirection = (amountInDegrees) => {
  const turns = amountInDegrees / 90;
  let newPosition = directions.indexOf(direction) + turns;
  while (newPosition > 3) {
    newPosition -= 4;
  }
  while (newPosition < 0) {
    newPosition += 4;
  }
  return directions[newPosition];
};

const doAction = (action, value) => {
  switch (action) {
    case "N":
      y += value;
      break;
    case "S":
      y -= value;
      break;
    case "E":
      x += value;
      break;
    case "W":
      x -= value;
      break;
    case "L":
      direction = getNewDirection(-1 * value);
      break;
    case "R":
      direction = getNewDirection(value);
      break;
    case "F":
      doAction(direction, value);
      break;
  }
};

const part1 = () => {
  for (const { action, value } of input) {
    doAction(action, value);
  }
  return Math.abs(x) + Math.abs(y);
};
console.log("Part 1: " + part1());

x = 0;
y = 0;
let waypointXRelative = 10;
let waypointYRelative = 1;

const rotateWaypoint = (amountInDegrees) => {
  while (amountInDegrees > 360) {
    amountInDegrees -= 360;
  }

  while (amountInDegrees < 0) {
    amountInDegrees += 360;
  }

  switch (amountInDegrees) {
    case 0:
    case 360:
      return;
    case 90: {
      const tempY = waypointYRelative;
      waypointYRelative = -1 * waypointXRelative;
      waypointXRelative = tempY;
      break;
    }
    case 180: {
      waypointYRelative = -1 * waypointYRelative;
      waypointXRelative = -1 * waypointXRelative;
      break;
    }
    case 270: {
      const tempY = waypointYRelative;
      waypointYRelative = waypointXRelative;
      waypointXRelative = -1 * tempY;
      break;
    }
  }
};

const part2 = () => {
  for (const { action, value } of input) {
    switch (action) {
      case "N":
        waypointYRelative += value;
        break;
      case "S":
        waypointYRelative -= value;
        break;
      case "E":
        waypointXRelative += value;
        break;
      case "W":
        waypointXRelative -= value;
        break;
      case "L":
        direction = rotateWaypoint(-1 * value);
        break;
      case "R":
        direction = rotateWaypoint(value);
        break;
      case "F":
        x += waypointXRelative * value;
        y += waypointYRelative * value;
        break;
    }
  }
  return Math.abs(x) + Math.abs(y);
};
console.log("Part 2: " + part2());
