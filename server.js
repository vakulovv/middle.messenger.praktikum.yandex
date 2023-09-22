const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  /* eslint no-console: 0 */
  console.log(`Running on port ${PORT}!`);
});
