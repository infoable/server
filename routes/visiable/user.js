const Router = require("koa-router");
const router = new Router();

const User = require("../../models/User");

router.post("/", async ctx => {
  const { email, password, username } = ctx.request.body;
  const user = new User({
    email,
    password,
    username
  });

  await user.save();

  ctx.body = {
    success: true
  };
});
module.exports = router;
