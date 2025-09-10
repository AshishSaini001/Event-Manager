const express=require('express');
const cors=require('cors');
const router=require('./routes/eventRouter');
const app =express();
app.use(cors());
app.use(express.json());

const port=5000;

app.use('/events',router);
app.use('/events',require('./routes/applyRouter'));



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
