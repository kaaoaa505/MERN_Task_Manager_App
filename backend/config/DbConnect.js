const mongoose = require('mongoose');

const DbConnect = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = DbConnect;