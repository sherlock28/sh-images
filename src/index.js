const app = require("./app");

const server = app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});

module.exports = { app, server };
