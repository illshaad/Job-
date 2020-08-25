const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://ShaddLove:BdYgCkq92AntXKVR@cluster0.7isxt.mongodb.net/embarquer?retryWrites=true&w=majority';
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
};

mongoose.connect(dbUrl, options, error => {
    if (error) {
        console.error(error);
    } else {
        console.log('Your database is operational...')
    }
});

module.exports = {
    mongoose: mongoose,
}