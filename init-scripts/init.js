db.createUser({
  user: "webbee_user",
  pwd: "12345",
  roles: [{ role: "readWrite", db: "webbee_db" }]
});