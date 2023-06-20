db.createUser({
  user: "user",
  pwd: "12345",
  roles: [{ role: "readWrite", db: "db" }]
});