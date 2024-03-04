import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import  axios  from 'axios';

const app = express();
let PORT = 3000;

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    typeDefs: `
        type User {
            id: ID!
            name: String
            username: String
            email: String
            phone: String
            website: String
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user : User
        }

        type Query {
            getUser(userId: ID): User
            getTodo(todoId: ID): Todo
            getAllTodos: [Todo]
            getAllUsers: [User]
        }
    `,
    resolvers: {
        Todo: {
            user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
        },
        Query: {
            getUser: async (parent, { userId }) => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId   }`);   
                return response.data;
            },
            getTodo: async (parent, { todoId }) => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
                return response.data;
            },
            getAllTodos: async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
                return response.data;
            },
            getAllUsers: async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                return response.data;
            },
        },
    },
});



app.get("/", (req, res) => {
    res.send("Hello World!");
});

async function startServer() {
    await server.start();
    app.use('/graphql', expressMiddleware(server));
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}


startServer();