require('dotenv').config();

const express = require('express');
const DbConnect = require('./config/DbConnect');



const app = express();

app.get('/', (req, res) => {
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