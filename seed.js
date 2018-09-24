"use strict";

const db = require("./server/db/db");
const User = require("./server/db/usersModel");

const users = [
  {
    name: `Kevin`,
    email: `kevin@gmail.com`,
    password: `123`
  },
  {
    name: `Yeah`,
    email: `Yeah@gmail.com`,
    password: `321`
  }
];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");
  await Promise.all(users.map(u => User.create(u)));
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}
runSeed();
