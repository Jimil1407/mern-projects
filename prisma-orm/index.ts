import { PrismaClient } from "./generated/prisma";

const client = new PrismaClient();

async function createUser() {
  const user = await client.user.create({
    data: {
      name: "John Doe",
      username: "john_doe",
      password: "123456",
      age: 20,
    },
  });

  console.log(user);
}

async function createTodo() {
  const todo = await client.todo.create({
    data: {
      title: "gym",
      description: "go to gym",
      completed: true,
    },
  });
  console.log(todo);
}

//createTodo();

async function findUser() {
  const user = await client.user.findFirst({
    where: {
      username: "joh_doe",
    },
  });
  console.log(user);
}

findUser();
