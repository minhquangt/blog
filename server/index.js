require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

//Route
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}

const PORT = process.env.PORT || 5000;

//Route
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api', require('./routes/upload'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});