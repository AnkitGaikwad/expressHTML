// req => middleware => res

// Middleware function
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getTime();
    console.log(method, url, time);
    // if we are terminating the middleware here we send the response directly
    // res.send("Test");
    // otherwise we call the next middleware by,
    next();
};

module.exports = logger;