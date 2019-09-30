const Router = require("koa-router");
const router = new Router();

const API = require("../../models/API");
router.get('/', async ctx => {
  const apis = await API.find({}, ["site", "name", "_id", "by", "actions", "actions.name"]).limit(15).populate('by', 'username');

  ctx.body = {
    success: true,
    data: apis
  }
});
router.post("/", async ctx => {
  const { site, name, by } = ctx.request.body;

  const api = new API({
    site,
    name,
    by
  });

  await api.save();
  ctx.status = 201;
  ctx.body = { success: true, id: api._id };
});
router.get("/user/:userid", async ctx => {
  const { userid } = ctx.params;

  const apis = await API.find(
    {
      by: userid
    },
    ["_id", "site", "name"]
  );

  ctx.body = {
    success: true,
    apis
  };
});
router.get("/:id", async ctx => {
  const { id } = ctx.params;

  const api = await API.findOne({ _id: id });
  if (!api) return ctx.throw(404, "API를 찾을 수 없습니다.");

  ctx.body = {
    success: true,
    data: api
  };
});

router.get("/:id/action/:aid", async ctx => {
  const { id, aid } = ctx.params;
  const api = await API.findOne({ _id: id });
  if (!api) return ctx.throw(404, "API를 찾을 수 없습니다.");

  const action = api.actions.id(aid);
  ctx.body = {
    success: true,
    data: action
  };
});
router.post("/:id/action", async ctx => {
  const { id } = ctx.params;
  const api = await API.findOne({ _id: id });
  if (!api) return ctx.throw(404, "API를 찾을 수 없습니다.");

  const { name } = ctx.request.body;
  api.actions.push({
    name
  });
  await api.save();

  ctx.status = 201;
  ctx.body = {
    success: true
  };
});
router.put("/:id/action/:aid", async ctx => {
  const { id, aid } = ctx.params;
  const api = await API.findOne({ _id: id });
  if (!api) return ctx.throw(404, "API를 찾을 수 없습니다.");
  const action = api.actions.id(aid);
  if (!action) return ctx.throw(404, "액션을 찾을 수 없습니다.");
  action.doings = ctx.request.body.workflows;
  await api.save();

  ctx.body = {
    success: true
  };
});
module.exports = router;
