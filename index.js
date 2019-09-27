require("dotenv").config();
const mongoose = require("mongoose");

const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const session = require("koa-session");
app.keys = ["ableSecret"];

app.use(session(app));
app.use(cors());
app.use(bodyParser());

mongoose.connect(process.env.MONGODB || "mongodb://localhost/able", {
  useNewUrlParser: true
});
const routes = require("./routes");
router.use(session(app));
Object.keys(routes).forEach(uri => {
  router.use(uri, routes[uri].routes());
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    if (err.expose) {
      ctx.body = {
        success: false,
        error: err.message
      };
    } else {
      console.error(err.stack);
      ctx.body = {
        success: false,
        error: "Error is occurred. Please Try Again."
      };
    }
  }
});
app.use(router.routes()).use(router.allowedMethods());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("App listens port", PORT);
});
