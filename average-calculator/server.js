const app = require('./src/app');

const PORT = 9876;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
