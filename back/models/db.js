const mongoose = require('mongoose');


const dbUrl = 'mongodb://applicationrh:application123456@ds161102.mlab.com:61102/applicationrh';
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