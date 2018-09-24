const router = require("express").Router();
const UserModels = require("../db/usersModel");
module.exports = router;

router.get("/users/:email", async (req, res, next) => {
  const email = req.params.email;
  try {
    let users = await UserModels.findOne({
      where: {
        email
      }
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post("/user", async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    let newUser = await UserModels.create({
      name,
      email,
      password
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});
