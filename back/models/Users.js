const db = require('./db');

const UserSchema = db.mongoose.Schema({
    googleId: {
        type: String,
        require: true
    }
});

const UserModel = db.mongoose.model('User', UserSchema);

module.exports = UserModel;