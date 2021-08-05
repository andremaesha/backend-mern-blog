const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.send("hai");
});

app.listen(4000, () => {
    console.log("server running at: localhost:4000");
});
