const mongoose = require('mongoose');

const dbUrl = 'mongodb://collaborateur:collaborateur1@ds363088.mlab.com:63088/embarquer';
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