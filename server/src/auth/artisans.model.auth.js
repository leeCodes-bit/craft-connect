"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtisanTable = exports.sql = exports.artisans = void 0;
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
exports.artisans = {
    id: "",
    surname: "",
    firstname: "",
    email: "",
    password: "",
    phone_number: "",
    state_of_origin: "",
    gender: "",
    craft: "",
    years_of_experience: 0,
    skills_description: "",
    home_address: "",
    image: "",
};
exports.sql = new Pool({
    user: "decagon",
    host: "localhost",
    database: "craft_connect",
    password: "@nightcrawler628Dapp",
    port: 5432,
});
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
