function authenticate(req, res, next) {
  // …
  console.log("Autheticating...");
  next();
}
module.exports= authenticate;