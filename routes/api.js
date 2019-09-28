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
  const { host } = ctx.query;
  const { action } = ctx.params;
  if (!host || !action) {
    return ctx.throw(400, "필수 항목이 없습니다.");
  }
  const query = API.findOne({
    site: host
  }).sort({ actions: -1 });
  const get = await query;
  let actions = get.actions;
  const actionsName = action;
  actions = actions
    .map(action => {
      if (action.name !== actionsName) return null;
      return {
        name: action.name,
        works: action.doings.map(v => {
          let data = {
            type: v.type
          };
          v.columns.forEach(d => {
            data[d.name] = d.value;
          });

          return data;
        })
      };
    })
    .filter(Boolean)[0];
  if (!actions) {
    return ctx.throw(404, "액션이 없습니다");
  }
  ctx.body = {
    success: true,
    data: actions
  };
});
router.get("/site/:siteName", async ctx => {
  const { siteName } = ctx.params;
  const api = await API.findOne(
    {
      name: siteName
    },
    ["site"]
  ).sort({ actions: -1 });
  if (!api) return ctx.throw(404, "API가 없습니다");
  ctx.body = {
    success: true,
    host: api.site
  };
});
module.exports = router;
