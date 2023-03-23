const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const neighborRouter = require('./routes/neighbor');
const friendRouter = require('./routes/friend');
const resellRouter = require('./routes/resell')

mongoose.connect('mongodb://localhost:27017/noritur', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home')
});

app.use('/noritur_neighbor', neighborRouter);
app.use('/noritur_friend', friendRouter);
app.use('/noritur_resell', resellRouter)

app.listen(3000, () => {
    console.log('Serving on port 3000')
})