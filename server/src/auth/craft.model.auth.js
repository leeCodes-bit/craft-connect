"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCraftTable = exports.craft = void 0;
const artisans_model_auth_1 = require("./artisans.model.auth");
exports.craft = {
    type_of_craft: "",
    description: "",
    images: [],
    price_rate: 0,
    charge_per_hour: 0,
    product: "",
};
const createCraftTable = async (req, res) => {
    const client = await artisans_model_auth_1.sql.connect();
    try {
        client.query(`CREATE TABLE IF NOT EXISTS Craft (
            id SERIAL ,
            craftID UUID PRIMARY KEY, 
            userId UUID REFERENCES Artisan(UserId),
            description TEXT NOT NULL,
            images VARCHAR[],
            price_rate INT NOT NULL,
            charge_per_hour INT NOT NULL,
            product VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
        res.send('Table has been created');
    }
    catch (error) {
        if (error)
            console.error(error);
    }
};
exports.createCraftTable = createCraftTable;
