import express from 'express';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const port = process.env.PORT || 5000;

app.listen(port);

export default app;
