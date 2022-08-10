const express = require("express");

var app = express();


const server = app.listen(process.env.PORT || 7000, () => {
    console.log(`Express running on port ${server.address().port}`);
})