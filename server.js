const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get("/", function(req, res){
    res.render('index');
});

app.listen(PORT, function () {
    console.log(`Running on port ${PORT}!`);
});
