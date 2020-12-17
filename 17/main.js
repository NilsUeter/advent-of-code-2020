fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map((e) => e.split(""));

const addNewPoints = (coordinates, cycle, initialWidth) => {
  for (let z = -cycle; z <= cycle; z++) {
    for (let y = -cycle; y < initialWidth + cycle; y++) {
      for (let x = -cycle; x < initialWidth + cycle; x++) {
        if (!coordinates[`${z}:${y}:${x}`]) {
          coordinates[`${z}:${y}:${x}`] = ".";
        }
      }
    }
  }
};

const getActiveNeighbors = (coordinates, z, y, x) => {
  let count = 0;
  for (let _z = -1; _z <= 1; _z++) {
    for (let _y = -1; _y <= 1; _y++) {
      for (let _x = -1; _x <= 1; _x++) {
        if (
          !(_x == 0 && _y == 0 && _z == 0) &&
          coordinates[`${z + _z}:${y + _y}:${x + _x}`] === "#"
        ) {
          count++;
        }
      }
    }
  }
  return count;
};

const part1 = () => {
  let coordinates = {}; // keys have the following format: z:y:x
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let k = 0; k < row.length; k++) {
      coordinates[`0:${i}:${k}`] = input[i][k];
    }
  }
  let initialWidth = input.length;
  for (let cycle = 1; cycle <= 6; cycle++) {
    addNewPoints(coordinates, cycle, initialWidth);
    const newCoordinates = JSON.parse(JSON.stringify(coordinates));
    for (const [key, value] of Object.entries(coordinates)) {
      const [z, y, x] = key.split(":").map(Number);
      const neighbors = getActiveNeighbors(coordinates, z, y, x);
      if (value === "#" && (neighbors < 2 || neighbors > 3)) {
        newCoordinates[key] = ".";
      } else if (value === "." && neighbors === 3) {
        newCoordinates[key] = "#";
      }
    }
    coordinates = newCoordinates;
  }
  return Object.values(coordinates).reduce(
    (acc, current) => acc + (current === "#" ? 1 : 0),
    0
  );
};
console.log("Part 1: " + part1());

const addNewPoints2 = (coordinates, cycle, initialWidth) => {
  for (let q = -cycle; q <= cycle; q++) {
    for (let z = -cycle; z <= cycle; z++) {
      for (let y = -cycle; y < initialWidth + cycle; y++) {
        for (let x = -cycle; x < initialWidth + cycle; x++) {
          if (!coordinates[`${q}:${z}:${y}:${x}`]) {
            coordinates[`${q}:${z}:${y}:${x}`] = ".";
          }
        }
      }
    }
  }
};

const getActiveNeighbors2 = (coordinates, q, z, y, x) => {
  let count = 0;
  for (let _q = -1; _q <= 1; _q++) {
    for (let _z = -1; _z <= 1; _z++) {
      for (let _y = -1; _y <= 1; _y++) {
        for (let _x = -1; _x <= 1; _x++) {
          if (
            !(_q === 0 && _x == 0 && _y == 0 && _z == 0) &&
            coordinates[`${q + _q}:${z + _z}:${y + _y}:${x + _x}`] === "#"
          ) {
            count++;
          }
        }
      }
    }
  }
  return count;
};

const part2 = () => {
  let coordinates = {}; // keys have the following format: q:z:y:x
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let k = 0; k < row.length; k++) {
      coordinates[`0:0:${i}:${k}`] = input[i][k];
    }
  }
  let initialWidth = input.length;
  for (let cycle = 1; cycle <= 6; cycle++) {
    addNewPoints2(coordinates, cycle, initialWidth);
    const newCoordinates = JSON.parse(JSON.stringify(coordinates));
    for (const [key, value] of Object.entries(coordinates)) {
      const [q, z, y, x] = key.split(":").map(Number);
      const neighbors = getActiveNeighbors2(coordinates, q, z, y, x);
      if (value === "#" && (neighbors < 2 || neighbors > 3)) {
        newCoordinates[key] = ".";
      } else if (value === "." && neighbors === 3) {
        newCoordinates[key] = "#";
      }
    }
    coordinates = newCoordinates;
  }
  return Object.values(coordinates).reduce(
    (acc, current) => acc + (current === "#" ? 1 : 0),
    0
  );
};

console.log("Part 2: " + part2());
