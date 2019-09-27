const Router = require("koa-router");
const router = new Router();

const API = require("../../models/API");
router.post("/", async ctx => {
  const { site, by } = ctx.request.body;

  const api = new API({
    site,
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
    ["_id", "site"]
  );

  ctx.body = {
    success: true,
    apis
  };
});
router.get("/:id", async ctx => {
  const { id } = ctx.params;

  const api = await API.findOne({ _id: id });

  ctx.body = {
    success: true,
    data: api
  };
});
module.exports = router;
