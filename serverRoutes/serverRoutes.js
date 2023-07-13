const router = (app) => {
  app.get("/hello", (request, response) => {
    response.send({ message: "Node.js and Express REST API" });
  });
  app.get("/chats", (request, response) => {});
};

// Экспорт роутера
module.exports = router;

console.log(chats);
