const { logEvents } = require("./logger");
const errorHandler = (err, req, resp, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  const status = resp.statusCode ? resp.statusCode : 500;
  resp.status(status);
  resp.json({ message: err.message });
};

module.exports = errorHandler;
