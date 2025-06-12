const todo = require('./todolist.js');

// Create a new instance of the todo class
const myTodoList = new todo();

// Test adding todos
myTodoList.add("Buy groceries");
myTodoList.add("Finish homework");
myTodoList.add("Go to gym");

// Test getting all todos
console.log("All todos:", myTodoList.getAll());

// Test getting a specific todo
console.log("First todo:", myTodoList.get(0));

// Test updating a todo
myTodoList.update(1, "Finish project");
console.log("After update:", myTodoList.getAll());

// Test removing a todo
myTodoList.remove(0);
console.log("After removal:", myTodoList.getAll());

// Test clearing all todos
myTodoList.clear();
console.log("After clearing:", myTodoList.getAll()); 