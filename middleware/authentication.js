function authenticate(req, res, next) {
  // …
  console.log("Autheticating...");
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
module.exports= authenticate;