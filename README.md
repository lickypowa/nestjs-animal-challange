# The Challenge

Your objective is to create a simple server-side application that will allow users to retrieve, add, update and delete an animal dataset (in memory). The dataset should contain the following fields:

- `id` (integer)
- `name` (string)
- `type` (string)
- `species` (string)
- `age` (integer)
- `gender` (string)
- `weight` (float)
- `verse` (string)

Each animal need to have some sort of interface that will allow user to interact with animal by api calls.
What is expected is that an animal can perform the following operations:
- `eat` - increase weight
- `sleep` - increase age
- `speak` - return a string with the animal's verse (e.g. "The cow goes moo")

The application should be able to perform the following operations:
- `Retrieve all animals`
- `Retrieve a single animal by id`
- `Add a new animal`
- `Update an existing animal by id`
- `Delete an existing animal by id`

optional:
- `Increase weight of an animal by id`
- `Increase age of an animal by id`
- `Return a string with the animal's verse`

## Optional tasks

- Create documentation for your API using Swagger [[Swagger documentation](https://swagger.io/)].
- Use database to store data.
- Implement a guard that can manage request security.
- Create a Dockerfile to run your application in a container.

## Bonus points

- Make animal's verse configurable.
- Use TypeScript [[Docs](https://www.typescriptlang.org/docs/)].
- Choose NestJS as the framework of your choice [[Docs](https://nestjs.com/)].
- Utilize Mongodb as database [[Docs](https://www.mongodb.com/docs/manual/)].
- Manage your tasks using GitHub Projects.
- Write unit tests for your code.
