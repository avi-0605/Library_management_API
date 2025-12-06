const express = require('express');
require('dotenv').config();
const bookRouter = require('./src/routes/bookRouter');
const issueBookRouter = require('./src/routes/issueBookRouter');  
const userRouter=require('./src/routes/userRouter');

require('./src/config/db');
const app = express();

const requestLogger = (request, response, next) => {
    console.log(`${request.method} ${request.path} ${new Date().toISOString()}`);
    next();
};

app.use(express.json());
app.use(requestLogger);
app.use('/books', bookRouter);
app.use('/issue-books', issueBookRouter);   
app.use('/users/',userRouter)

app.get('/', (request, response) => {
    response.send('Welcome to Library Management API'); 
});

app.get('/health', (request, response) => {
    response.status(200).json({
        status: "OK",
        message:"Server is running successfully"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server is running on port 4000');
});