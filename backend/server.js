require('dotenv').config();

const express = require('express');
const cors = require('cors');

const DbConnect = require('./config/DbConnect');

const taskRoutes = require('./routes/TaskRoutes');

const app = express();

// app.use(cors());
app.use(cors({
    origin: [
        "http://localhost:3000"
    ]
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/tasks', taskRoutes);

app.get('/', (_req, res) => {
    res.send('Home page')
});

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