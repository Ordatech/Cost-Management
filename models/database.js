const uuid = require('uuid');
const crypto = require('crypto');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectionString =
    'mongodb+srv://ordatech11:Ordavid2007@cluster0.p52ilu6.mongodb.net/?retryWrites=true&w=majority';

//Connecting to the database
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;

//If an error occurred, this event listener will be executed
db.on('error', () => {
    console.log('Error!\nCould not connect to the Database!');
});

//Once the database is opened, this event listener will be executed
db.once('open', () => {
    console.log('Connected!');
});

// Creating the user schema and cost schema
const userSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    birthday: Date,
});

const costSchema = new mongoose.Schema({
    user_id: Number,
    day: {
        type: Number,
        validate: {
            validator: function (v) {
                return v >= 1 && v <= 31;
            },
            message: 'Day should be between 1 and 31.',
        },
    },
    month: {
        type: Number,
        validate: {
            validator: function (v) {
                return v >= 1 && v <= 12;
            },
            message: 'Month should be between 1 and 12.',
        },
    },
    year: {
        type: Number,
        validate: {
            validator: function (v) {
                return v >= 1900;
            },
            message: 'Year should be greater than or equal to 1900.',
        },
    },
    id: {
        type: String,
        index: true,
        unique: true,
        default: () => crypto.randomUUID(),
    },
    description: String,
    category: {
        type: String,
        enum: [
            'food',
            'health',
            'housing',
            'sport',
            'education',
            'transportation',
            'other',
        ],
    },
    sum: Number,
});

const reportSchema = new mongoose.Schema({
    user_id: Number,
    month: Number,
    year: Number,
    report: Object,
});

// Define user and cost models
const User = mongoose.model('User', userSchema);
const Cost = mongoose.model('Cost', costSchema);
const Report = mongoose.model('Report', reportSchema);

// Creating a single document of a user
var user = new User({
    id: '123123',
    firstName: 'Moshe',
    lastName: 'Israeli',
    birthday: new Date(1990, 0, 11),
});

async function createUserIfNotExists(user) {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ id: user.id });
        if (existingUser) {
            console.log('User already exists, not creating');
            return existingUser;
        }
        // Create new user
        const newUser = await User.create(user);
        console.log(`New User created: ${newUser}`);
        return newUser;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

createUserIfNotExists(user)
    .then(console.log)
    .catch(console.error);

module.exports = { Cost, Report };
