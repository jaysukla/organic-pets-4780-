const app = require("express")();

app.get("/", (req, res) => {
  try {
    res.send("Welcome to calendly");
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

app.listen(4500, () => {
  console.log("Server Running in port 4500");
});
