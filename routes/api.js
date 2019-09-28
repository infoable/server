const Router = require("koa-router");
const router = new Router();

const API = require("../models/API");
router.get("/list", async ctx => {
  const { host } = ctx.query;

  if (!host) {
    return ctx.throw(400, "host query가 있어야 합니다.");
  }
  const get = await API.find({
    site: host
  });
  const api = get.sort((a, b) => {
    if (a.actions.length > b.actions.length) {
      return -1;
    }
    if (a.actions.length < b.actions.length) return 1;
    return 0;
  })[0];
  const actions = api.actions.map(v => v.name);

  ctx.body = {
    success: true,
    actions
  };
});
router.get("/:action", async ctx => {
  //TODO: Action
});
module.exports = router;
