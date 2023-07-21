const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs").promises;
const path = require("path");
const { error } = require("console");
const { json } = require("body-parser");
const PORT = 3000;

app.use(express.static("./data"));
app.use(bodyParser.json());
app.use(cors());

// app.all("/", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost:8080");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

var corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const readFile = async (path) => {
  return fs
    .readFile(path, "utf-8", (error, data) => {
      return;
    })
    .then((data) => {
      // console.log(data);
      // console.log("parsed data: ", JSON.parse(data));
      console.log(data);
      return JSON.parse(data);
    });
};

// wData - writeable data
const writeFile = async (
  path,
  wData,
  response
  // , rData
) => {
  return fs
    .writeFile(path, wData, (error) => {
      response.send(error);
    })
    .then((res) => response.send(wData));
};

// fs.writeFile("./data/messages.json", JSON.stringify(data, null, 2), (error) => {
//   response.send(error);
// }).then((answer) => {
//   console.log(data);
//   response.send(JSON.stringify(data));
// });

// Profile
app.get("/profile", (request, response) => {
  readFile("./data/profile.json").then((data) => {
    response.send(JSON.stringify(data));
  });
});

// Переделать. Сейчас в ответ отправляются неизмененные данные из request'a
app.post("/profile", (request, response) => {
  const profileData = request.body;

  writeFile(
    "./data/profile.json",
    JSON.stringify(profileData, null, 2),
    response
  );
});

// Messages

app.get("/messages", (request, response) => {
  readFile("./data/messages.json").then((data) => {
    console.log(data);
    response.send(JSON.stringify(data));
  });
});

app.post("/messages_add", (request, response) => {
  const chatId = request.body.chatId;
  console.log(chatId);
  const message = request.body.message;

  readFile("./data/messages.json")
    .then((chatList) => {
      chatList[chatId].push(message);
      return chatList;
    })
    .then((data) => {
      writeFile(
        "./data/messages.json",
        JSON.stringify(data, null, 2),
        response
        // ,
        // JSON.stringify(data, null, 2)
      );
      console.log("updated messages", data);
    });
  // Пример fetch() запроса:
  // fetch("http://localhost:3000/messages_add", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     chatId: "9efd9c12-18a2-11ee-be56-0242ac120002",
  //     message: { author: "me", text: "тест", id: JSON.stringify(Date.now()) },
  //   }),
  // });
});

app.post("/messages_delete", (request, response) => {
  const chatId = request.body.chatId;
  const messageId = request.body.messageId;

  readFile("./data/messages.json")
    .then((chatList) => {
      const filteredChat = chatList[chatId].filter(
        (item) => item.id != messageId
      );
      return { ...chatList, [chatId]: [...filteredChat] };
    })
    .then((data) => {
      writeFile(
        "./data/messages.json",
        JSON.stringify(data, null, 2),
        response
        // ,
        // JSON.stringify(data, null, 2)
      );
    });
  // Пример fetch() запроса:
  // fetch("http://localhost:3000/messages_delete", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     chatId: "9efd9c12-18a2-11ee-be56-0242ac120002",
  //     messageId: "1689231119027"
  //   }),
  // });
});

// Chats

app.get("/chats", (request, response) => {
  // fs.readFile("./data/chats.json", "utf-8", (error, data) => {
  //   if (error) {
  //     response.send(error);
  //   }
  // })
  readFile("./data/chats.json").then((data) => response.send(data));
});

app.post("/chats_add", (request, response) => {
  // В теле запроса передается объект с двумя свойствами - name и id. Пример: {"name": "Чат 1", "id": "9efd8d44-18a2-11ee-be56-0242ac120002"}
  console.log("request body: ", request.body);
  const chatId = request.body.id;

  readFile("./data/chats.json")
    .then((chatsRoot) => {
      chatsRoot.chatList.push(request.body);
      return chatsRoot;
    })
    .then((data) =>
      writeFile(
        "./data/chats.json",
        JSON.stringify({ ...data }, null, 2),
        response
      )
    );

  readFile("./data/messages.json").then((chatList) => {
    const newChatList = JSON.stringify(
      { ...chatList, [request.body.id]: [] },
      null,
      2
    );
    console.log(newChatList);
    fs.writeFile("./data/messages.json", newChatList, (error) => {
      if (error) {
        response.send(error);
      }
    });
  });
});

// Пример fetch() запроса:
// fetch("http://localhost:3000/chats_add", {
// method: "POST",
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify({
//   id: "9efd9c15-18a2-11ee-be56-0242ac120002",
//   name: "Тестовый чат"
// }),
// });

app.post("/chats_delete", (request, response) => {
  const chatId = request.body.id; // Сейчас в теле запроса передается объект со свойством id. Пример: {id: "..."}

  readFile("./data/chats.json")
    .then((chatsRoot) => {
      chatsRoot.chatList = chatsRoot.chatList.filter(
        (item) => item.id != chatId
      );
      return chatsRoot;
    })
    .then((data) =>
      writeFile(
        "./data/chats.json",
        JSON.stringify({ ...data }, null, 2),
        response
      )
    );

  readFile("./data/messages.json").then((chatList) => {
    delete chatList[chatId];
    const newChatList = JSON.stringify(chatList, null, 2);
    fs.writeFile("./data/messages.json", newChatList, (error) => {
      if (error) {
        response.send(error);
      }
    });
  });
});

// App installs

app.post("/app_install", cors(corsOptions), (request, response) => {
  readFile("./data/appInstalls.json").then((data) => {
    writeFile(
      "./data/appInstalls.json",
      JSON.stringify(
        {
          ...data,
          installs: [
            ...data.installs,
            { id: Date.now().toString(), info: request.headers },
          ],
        },
        null,
        2
      ),
      response
    );
  });
});

// Subscription

app.post("/save-subscription", (req, res) => {
  // if (!isValidSaveRequest(req, res)) {
  //   return;
  // }

  return saveSubscriptionToDatabase(req.body, res)
    .then((subscriptionId) => {
      console.log(subscriptionId);
      // res.setHeader("Content-Type", "application/json");
      // res.status(200);
      res.send(JSON.stringify({ data: { success: true } }));
    })
    .catch(function (err) {
      res.status(500);
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          error: {
            id: "unable-to-save-subscription",
            message:
              "The subscription was received but we were unable to save it to our database.",
          },
        })
      );
    });
});

// Subscription. Добавленных данных подписки в БД

const saveSubscriptionToDatabase = async (requestBody, response) => {
  const id = Date.now().toString();
  console.log("Записываю данные подписки в БД");
  readFile("./data/subscriptions.json").then((data) => {
    const subscriptionData = JSON.stringify(
      {
        ...data,
        subscriptions: [...data.subscriptions, { id, info: requestBody }],
      },
      null,
      2
    );
    fs.writeFile("./data/subscriptions.json", subscriptionData, (error) => {
      if (error) {
        response.send(error);
      }
    });
    return id;
  });
  return id;
};

// Start the server
app.listen(PORT, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`server is running on port: ${PORT}!`);
  console.log(__dirname);
});
