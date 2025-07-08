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

//createUser();

async function createTodo() {
  const todo = await client.todo.create({
    data: {
      title: "coding",
      description: "go to coding",
      completed: false,
      userId: "658aa03a-e31c-42e7-b060-bf77fa65de73",
    },
  });
  console.log(todo);
}

//createTodo();

async function findUser() {
  const user = await client.user.findFirst({
    where: {
      username: "john_doe",
    },
    include: {
      todos: true,
    },
  });
  console.log(user);
}

findUser();
