const Router = require("koa-router");
const router = new Router();

const handleAction = require("../src/handleAction");
const User = require("../src/User");

router.post("/", async ctx => {
  const { query } = ctx.request.body;
  if (!query) {
    return ctx.throw(400, "query가 있어야 합니다.");
  }
  if (!ctx.session.user) {
    ctx.session.user = new User();
  }
  const text = await handleAction(query, ctx.session.user);
  ctx.body = {
    text
  };
});

module.exports = router;
