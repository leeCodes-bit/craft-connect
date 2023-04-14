"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtisanTable = exports.createArtisanToken = exports.sql = exports.artisans = exports.verifyToken = exports.signToken = void 0;
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
const jsonwebtoken_1 = require("jsonwebtoken");
const signToken = (username, id) => {
    const token = (0, jsonwebtoken_1.sign)({
        username: username,
        id: id
    }, 'thisIsACommonSecret');
    return token;
};
exports.signToken = signToken;
const verifyToken = (req, res, next) => {
    try {
        let token = req.cookies['thisIsMyToken'];
        if (!token) {
            req.authenticated = true;
            res.status(403);
            res.send('Successful');
        }
        else {
            let validator = (0, jsonwebtoken_1.verify)(token, "thisIsACommonSecret");
            if (validator) {
                return next();
            }
            else {
                console.log('not successful');
            }
        }
    }
    catch (err) {
        if (err) {
            console.log(err);
        }
    }
};
exports.verifyToken = verifyToken;
exports.artisans = {
    id: "",
    surname: "",
    firstname: "",
    email: "",
    dob: '',
    password: "",
    phone_number: "",
    state_of_origin: "",
    gender: "",
    craft: "",
    years_of_experience: 0,
    skills_description: "",
    home_address: "",
};
exports.sql = new Pool({
    user: 'mac',
    host: 'localhost',
    database: 'craft_connect',
    password: '1234',
    port: 5432,
});
const createArtisanToken = async (req, res) => {
    const client = await exports.sql.connect();
    try {
        client.query(`CREATE TABLE IF NOT EXISTS artisan_token (
      id SERIAL,
      email VARCHAR(255) NOT NULL,
      token VARCHAR(255) NOT NULL
    )`);
        res.send('Artisan token table created successfully');
    }
    catch (err) {
        if (err) {
            res.status(500).send(err);
        }
    }
};
exports.createArtisanToken = createArtisanToken;
const createArtisanTable = async (req, res) => {
    const client = await exports.sql.connect();
    try {
        client.query(`CREATE TABLE IF NOT EXISTS Artisan (
      id SERIAL,  
      UserId UUID PRIMARY KEY,
      surname VARCHAR(255) NOT NULL, 
      firstname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL, 
      dob DATE NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone_number VARCHAR(255) NOT NULL, 
      state_of_origin VARCHAR(255) NOT NULL, 
      gender VARCHAR(255) NOT NULL,
      craft VARCHAR(255) NOT NULL,
      years_of_experience VARCHAR(255) NOT NULL, 
      skills_description VARCHAR(500) NOT NULL,
      home_address VARCHAR(400) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      
    )`);
        res.send('Table has been created');
    }
    catch (error) {
        if (error)
            console.log(error);
    }
};
exports.createArtisanTable = createArtisanTable;
//creating new table that of artisans
