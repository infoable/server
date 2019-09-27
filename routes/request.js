const Router = require("koa-router");
const router = new Router();

const handleAction = require("../src/handleAction");
const User = require("../src/User");

router.post("/", async ctx => {
  const { query, token } = ctx.request.body;
  if (!query) {
    return ctx.throw(400, "query와 token이 모두 있어야 합니다.");
  }
  const user = new User();
  if (token) await user.import(token);

  const text = await handleAction(query, user);
  ctx.body = {
    text,
    token: await user.export()
  };
});

module.exports = router;
