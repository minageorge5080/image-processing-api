import express from "express";
import routes from "./routes/index";
import middleware from "./middleware/index";

const app = express();

app.use(middleware.loggingMiddleware);
app.use("/public", express.static("./public"));

app.use(routes);

const port = process.env["SERVER_PORT"] ?? 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
