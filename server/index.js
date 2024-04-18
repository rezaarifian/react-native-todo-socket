const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();

let day = date.getDate();
let month = monthNames[date.getMonth() + 1];

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${month} ${day}`;

let todoList = [];
let todoListCompleted = [];

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	socket.on("addTodo", (todo) => {
		todoList.unshift({ _id: generateID(), title: todo, completed: false, date: currentDate });
		socket.emit("todos", todoList);
	});

	socket.on("deleteTodo", (id) => {
		let result = todoList.filter((todo) => todo._id !== id);
		todoList = result;
		socket.emit("todos", todoList);
	});

	socket.on("editTodo", (data, input) => {
		objIndex = todoList.findIndex(todo => todo._id === data._id);
		todoList[objIndex].title = input;
		socket.emit("todos", todoList);
	});

	socket.on("toDoDone", (data) => {
		objIndex = todoList.findIndex(todo => todo._id === data._id);
		todoList[objIndex].completed = true;
		todoList[objIndex].date = currentDate;
		socket.emit("todoCompleted", todoList);
	});

	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});
});

app.get("/todos", (req, res) => {
	res.json(todoList);
});
app.get("/todoCompleted", (req, res) => {
	res.json(todoListCompleted);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
