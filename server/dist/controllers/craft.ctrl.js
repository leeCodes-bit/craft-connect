"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.craftUpdateMethod = exports.craftDeleteMethod = exports.craftPostMethod = exports.craftGetMethod = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const artisans_model_auth_1 = require("../auth/artisans.model.auth");
const queries_1 = require("../auth/queries");
const craft_model_auth_1 = require("../auth/craft.model.auth");
const uuid_1 = require("uuid");
const craftGetMethod = (req, res) => {
    res.status(200).send('The Page is available');
};
exports.craftGetMethod = craftGetMethod;
const craftPostMethod = (req, res) => {
    const { description, images, price_rate, charge_per_hour, product } = req.body;
    const cookie = req.cookies['thisIsMyToken'];
    console.log(cookie);
    if (!cookie) {
        res.status(401).send('User needs to be logged in');
    }
    else {
        (0, jsonwebtoken_1.verify)(cookie, 'thisIsACommonSecret', (err, data) => {
            if (err) {
                res.status(500).send(err.message);
            }
            else {
                const userEmail = data.username;
                const userID = data.id;
                console.log(userEmail, userID);
                const userid = userID.toString();
                const craftid = (0, uuid_1.v4)();
                craft_model_auth_1.craft.craftId = craftid;
                craft_model_auth_1.craft.userId = userid;
                craft_model_auth_1.craft.description = description;
                craft_model_auth_1.craft.images = images;
                craft_model_auth_1.craft.price_rate = price_rate;
                craft_model_auth_1.craft.charge_per_hour = charge_per_hour;
                craft_model_auth_1.craft.product = product;
                if (userEmail !== 'undefined' || userID !== undefined) {
                    artisans_model_auth_1.sql.query(queries_1.findOneCraftByUserId, [craft_model_auth_1.craft.craftId, craft_model_auth_1.craft.userId], (err, result) => {
                        if (result) {
                            res.status(401).send('product and craft already exists');
                        }
                        else {
                            artisans_model_auth_1.sql.query(queries_1.insertNewCraft, [
                                craft_model_auth_1.craft.craftId,
                                craft_model_auth_1.craft.userId,
                                craft_model_auth_1.craft.description,
                                craft_model_auth_1.craft.images,
                                craft_model_auth_1.craft.price_rate,
                                craft_model_auth_1.craft.charge_per_hour,
                                craft_model_auth_1.craft.product
                            ], (err, result) => {
                                if (err) {
                                    res.status(403).send(err.message);
                                }
                                else {
                                    res.status(201).send('craft and product saved for user');
                                }
                            });
                        }
                    });
                }
            }
        });
    }
};
exports.craftPostMethod = craftPostMethod;
const craftDeleteMethod = (req, res) => {
    const token = req.cookies['thisIsMyToken'];
    if (!token) {
        res.send('User not logged in');
    }
    else {
        (0, jsonwebtoken_1.verify)(token, 'thisIsACommonSecret', (err, data) => {
            const userID = data.id;
            const product = req.params.product;
            console.log(product, userID);
            artisans_model_auth_1.sql.query(queries_1.deleteFromCraftByProduct, [product, userID], (err, result) => {
                if (err) {
                    res.status(401).send(err.message);
                }
                else {
                    res.send('Product deleted successfully');
                }
            });
        });
    }
};
exports.craftDeleteMethod = craftDeleteMethod;
const craftUpdateMethod = (req, res) => {
    const { description, images, price_rate, charge_per_hour, product } = req.body;
    const token = req.cookies['thisIsMyToken'];
    if (!token) {
        res.send('User not logged in');
    }
    else {
        (0, jsonwebtoken_1.verify)(token, 'thisIsACommonSecret', (err, data) => {
            const userID = data.id;
            artisans_model_auth_1.sql.query(queries_1.updateCraft, [description, images, price_rate, charge_per_hour, product, userID], (err, result) => {
                if (err) {
                    res.status(401).send(err.message);
                }
                else {
                    res.send('Product updated successfully');
                }
            });
        });
    }
};
exports.craftUpdateMethod = craftUpdateMethod;
