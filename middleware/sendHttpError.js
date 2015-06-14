module.exports = function(req, res, next) {

  res.sendHttpError = function(err) {
    res.status(err.status);
    if (res.req.headers['accept'] == 'application/json, text/plain, */*') {
      res.json(err);
    } else {
        res.render('error', {
            message: err.message,
            error: err
        });
    }
  };

  next();

};