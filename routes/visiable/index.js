const Router = require("koa-router");
const router = new Router();

const user = require("./user");

router.use(user.routes()).use(user.allowedMethods());
module.exports = router;
