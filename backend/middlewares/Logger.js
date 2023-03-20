const Logger = (req, res, next) => {
    console.log(req.method);
    console.log('Logger middleware is working');
    next();
};

module.exports = Logger;