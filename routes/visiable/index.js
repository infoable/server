const Router = require("koa-router");
const router = new Router();

const user = require("./user");
const token = require("./token");
const api = require("./api");

router.use("/user", user.routes());
router.use("/token", token.routes());
router.use("/api", api.routes());
module.exports = router;
