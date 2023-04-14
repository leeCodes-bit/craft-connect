"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.craft = exports.artisans = exports.sql = void 0;
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
exports.sql = new Pool({
    user: 'decagon',
    host: 'localhost',
    database: 'craft_connect',
    password: '@nightcrawler628Dapp',
    port: 5432
});
//creating new table that of artisans
const createTable = exports.sql.query(`CREATE TABLE Artisans (
    (id serial PRIMARY KEY, 
    surname VARCHAR(255) NOT NULL, 
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL, 
    dob DATETIME NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL, 
    state_of_origin VARCHAR(255) NOT NULL, 
    gender VARCHAR(255) NOT NULL,
    craft VARCHAR(255) NOT NULL,
    years_of_experience VARCHAR(255) NOT NULL, 
    skills_description VARCHAR(500) NOT NULL,
    home_address VARCHAR(400) NOT NULL, 
    image VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) 

)`);
createTable.then(result => {
});
exports.artisans = {
    id: '',
    surname: '',
    firstname: '',
    email: '',
    password: '',
    phone_number: '',
    state_of_origin: '',
    gender: '',
    craft: '',
    years_of_experience: 0,
    skills_description: '',
    home_address: '',
    image: ''
};
exports.craft = {
    type_of_craft: '',
    description: '',
    images: [],
    price_rate: 0,
    charge_per_hour: 0,
    product: ''
};
