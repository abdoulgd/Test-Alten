import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

//Documentation swaggers
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Product REST API',
            description: "A REST API built with Express and MongoDB and documented with Swagger.",
            version: '0.1',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}
const openapiSpecification = swaggerJsDoc(options);

app.use(cors({
    origin: ['http://localhost:4200'],
    credentials: true,

}));

//middleware
app.use(express.json());

//difine all our routes
app.use('/api', routes);

//route documentation swagger
app.use('/api-docs', serve, setup(openapiSpecification));

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
})



