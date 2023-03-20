require('dotenv').config();

const express = require('express');
const HttpStatusCodes = require('http-status-codes');

const DbConnect = require('./config/DbConnect');
const Logger = require('./middlewares/Logger');
const TaskModel = require('./models/TaskModel');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const StatusCodes = HttpStatusCodes.StatusCodes;

app.get('/', (req, res) => {
    res.send('Home page')
});

app.post('/api/tasks', Logger, async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        return res.status(StatusCodes.OK).json(task);
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error});
    }
})

const serverStart = async () => {
    try {
        await DbConnect();

        const PORT = process.env.PORT ?? 5000;
        const INFO = process.env.INFO ?? 'Nothing.';
        const HOST = process.env.HOST ?? 'loalhost';

        app.listen(PORT, () => {
            console.log(`server is ready on port ${PORT}`);
            console.log(`Info is: ${INFO}`);
            console.log(`http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
serverStart();