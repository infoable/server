const Router = require("koa-router");
const router = new Router();

const token = require("../../src/visiable/token");
const User = require("../../models/User");
router.post("/", async ctx => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne(
    {
      email
    },
    ["email", "password", "username"]
  );
  if (!user || !user.verifyPassword(password)) {
    return ctx.throw(404, "유저가 없습니다.");
  }

  ctx.body = {
    success: true,
    token: await token.sign({
      email,
      username: user.username,
      id: user._id
    })
  };
});

router.get("/verify", async ctx => {
  const t = ctx.headers["x-access-token"];

  if (!t) {
    return ctx.throw(400, "token이 없습니다.");
  }
  ctx.body = {
    success: true,
    data: await token.verify(t)
  };
});
module.exports = router;
