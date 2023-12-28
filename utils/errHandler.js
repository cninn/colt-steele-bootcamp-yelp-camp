const errHandles = (err, req, res, next) => {
  if (err.name === "MongoNotConnectedError") {
    const message = "Database Bağlantı Hatası";
    const statusCode = 500;
    return res.render("error", { message, statusCode });
  } else if (err.name === "CastError") {
    const message = "Kamp bulunamadı yada silinmiş";
    const statusCode = 500;
    return res.render("error", { message, statusCode });
  } else {
    let { message = "Something went wrong", statusCode = 401 } = err;

    res.status(statusCode).render("error", {message,err,statusCode});
  }

};
module.exports = errHandles;
