"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.artisansDeleteMethod = exports.artisansPutMethod = exports.artisansGetPutMethod = exports.artisansLoginPostMethod = exports.artisansLoginGetMethod = exports.artisansPostMethod = exports.artisansGetMethod = void 0;
const artisans_model_auth_1 = require("../auth/artisans.model.auth");
const artisans_model_auth_2 = require("../auth/artisans.model.auth");
const email_validator_1 = __importDefault(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_2 = require("bcrypt");
dotenv_1.default.config();
const queries_1 = require("../auth/queries");
const jsonwebtoken_1 = require("jsonwebtoken");
const artisansGetMethod = (req, res) => {
    artisans_model_auth_1.sql.query(queries_1.findAndGetAll, (err, data) => {
        if (err) {
            res.status(404).send(err.message || err);
        }
        else {
            res.status(200).send(data);
        }
    });
};
exports.artisansGetMethod = artisansGetMethod;
const artisansPostMethod = async (req, res) => {
    const { surname, firstname, dob, email, password, password2, phone_number, state_of_origin, gender, craft, years_of_experience, skills_description, home_address, } = req.body;
    if (email === "" || password === "" || surname === "" || firstname === "") {
        res.status(401).send({ message: "Input valid details" });
    }
    else {
        if (password !== password2) {
            res.status(401).send({ message: "passwords do not match" });
        }
        else {
            const validator = email_validator_1.default.validate(email);
            if (!validator) {
                res.status(401).send({ message: "Please enter a valid email" });
            }
            else {
                const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
                function validateName(name) {
                    return nameRegex.test(name);
                }
                const validSurname = validateName(surname);
                const validFirstName = validateName(firstname);
                if (!validFirstName || !validSurname) {
                    res.status(400).send({ message: "invalid surname or first name" });
                }
                else {
                    try {
                        artisans_model_auth_2.artisans.id = (0, uuid_1.v4)();
                        artisans_model_auth_2.artisans.surname = surname;
                        artisans_model_auth_2.artisans.firstname = firstname;
                        artisans_model_auth_2.artisans.email = email;
                        artisans_model_auth_2.artisans.dob = dob;
                        artisans_model_auth_2.artisans.password = password;
                        artisans_model_auth_2.artisans.phone_number = phone_number;
                        artisans_model_auth_2.artisans.state_of_origin = state_of_origin;
                        artisans_model_auth_2.artisans.gender = gender;
                        artisans_model_auth_2.artisans.craft = craft;
                        artisans_model_auth_2.artisans.years_of_experience = years_of_experience;
                        artisans_model_auth_2.artisans.skills_description = skills_description;
                        artisans_model_auth_2.artisans.home_address = home_address;
                        //check if user already exists
                        artisans_model_auth_1.sql.query(queries_1.findOneByEmail, [email], async (err, result) => {
                            if (err) {
                                res.status(403).send({ message: err.message });
                            }
                            else {
                                if (result.rows.length) {
                                    res.send("User with the email already exists");
                                }
                                else {
                                    const salt = bcrypt_1.default.genSaltSync(10);
                                    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                                    let token = crypto_1.default.randomBytes(32).toString('hex');
                                    let url = `https://localhost:3005/verifylink/${token}/${email}`;
                                    let text = "Press the link to verify your account";
                                    artisans_model_auth_1.sql.query(queries_1.insertNewArtisan, [
                                        artisans_model_auth_2.artisans.id,
                                        artisans_model_auth_2.artisans.surname,
                                        artisans_model_auth_2.artisans.firstname,
                                        artisans_model_auth_2.artisans.email,
                                        artisans_model_auth_2.artisans.dob,
                                        hashedPassword,
                                        artisans_model_auth_2.artisans.phone_number,
                                        artisans_model_auth_2.artisans.state_of_origin,
                                        artisans_model_auth_2.artisans.gender,
                                        artisans_model_auth_2.artisans.craft,
                                        artisans_model_auth_2.artisans.years_of_experience,
                                        artisans_model_auth_2.artisans.skills_description,
                                        artisans_model_auth_2.artisans.home_address,
                                    ], (err, result) => {
                                        if (err) {
                                            res.status(401).send({ message: err.message });
                                        }
                                        else {
                                            res.status(200).send({ message: result });
                                        }
                                    });
                                }
                            }
                        });
                    }
                    catch (error) {
                        if (error) {
                            res.status(500).send({ message: error });
                        }
                    }
                }
            }
        }
    }
};
exports.artisansPostMethod = artisansPostMethod;
const artisansLoginGetMethod = (req, res) => {
    res.status(200).send({ message: 'Login Route created successfully' });
};
exports.artisansLoginGetMethod = artisansLoginGetMethod;
const artisansLoginPostMethod = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    artisans_model_auth_1.sql.query(queries_1.findOneByEmail, [email], (err, result) => {
        if (err) {
            res.status(404).send(err.message);
        }
        else {
            console.log(result.rows[0]);
            const pass = result.rows[0].password;
            const userId = result.rows[0].userid;
            console.log(pass, userId);
            (0, bcrypt_2.compare)(password, pass).then((match) => {
                if (!match) {
                    res.status(401).json({ message: 'User not found, Pls log in' });
                }
                else {
                    let token = (0, artisans_model_auth_1.signToken)(email, userId);
                    res.cookie('thisIsMyToken', token, {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 30 * 1000
                    });
                    const cookie = req.cookies['thisIsMyToken'];
                    console.log(cookie);
                    if (!cookie) {
                        res.status(401).send({ message: 'token not generated' });
                    }
                    else {
                        artisans_model_auth_1.sql.query(queries_1.insertToken, [email, cookie], (err, data) => {
                            if (err) {
                                res.status(500).send({ message: 'Problem inserting the token' });
                            }
                            else {
                                res.status(201).send({ message: "Login successful \n", result: data });
                            }
                        });
                    }
                }
            });
        }
    });
};
exports.artisansLoginPostMethod = artisansLoginPostMethod;
const artisansGetPutMethod = (req, res) => {
    const email = req.params.email;
    artisans_model_auth_1.sql.query(queries_1.findOneByEmail, [email], (err, result) => {
        if (err) {
            res.status(403).send(err);
        }
        else {
            if (result.rows.length > 0) {
                res.status(201).send('Everything is good');
            }
            else {
                res.status(500).send("Please sign up and register");
            }
        }
    });
};
exports.artisansGetPutMethod = artisansGetPutMethod;
const artisansPutMethod = (req, res) => {
    const token = req.cookies['thisIsMyToken'];
    if (!token) {
        res.send('User not logged in');
    }
    else {
        (0, jsonwebtoken_1.verify)(token, 'thisIsACommonSecret', (err, data) => {
            const userID = data.id;
            artisans_model_auth_1.sql.query(queries_1.findOneById, [userID], (err, data) => {
                if (err) {
                    res.status(404).send(err.message || err);
                }
                else {
                    if (data.rows.length > 0) {
                        const { surname, firstname, dob, password, email, phone_number, state_of_origin, gender, craft, years_of_experience, skills_description, home_address, } = req.body;
                        const salt = bcrypt_1.default.genSaltSync(10);
                        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                        const id = data.rows[0].userId;
                        data.rows[0].surname = surname;
                        data.rows[0].firstname = firstname;
                        data.rows[0].dob = dob;
                        data.rows[0].password = hashedPassword;
                        data.rows[0].email = email;
                        data.rows[0].phone_number = phone_number;
                        data.rows[0].state_of_origin = state_of_origin;
                        data.rows[0].gender = gender;
                        data.rows[0].craft = craft;
                        data.rows[0].years_of_experience = years_of_experience;
                        data.rows[0].skills_description = skills_description;
                        data.rows[0].home_address = home_address;
                        artisans_model_auth_1.sql.query(queries_1.updateArtisan, [
                            data.rows[0].surname,
                            data.rows[0].firstname,
                            data.rows[0].dob,
                            data.rows[0].password,
                            data.rows[0].email,
                            data.rows[0].phone_number,
                            data.rows[0].state_of_origin,
                            data.rows[0].gender,
                            data.rows[0].craft,
                            data.rows[0].years_of_experience,
                            data.rows[0].skills_description,
                            data.rows[0].home_address,
                            userID
                        ], (err, data) => {
                            if (err) {
                                res.status(403).send(err);
                            }
                            else {
                                res.status(200).send('User Profile updated successfully');
                            }
                        });
                    }
                    else {
                        res.send('There is no user with this data');
                    }
                }
            });
        });
    }
};
exports.artisansPutMethod = artisansPutMethod;
const artisansDeleteMethod = (req, res) => {
    const id = req.params.id;
    artisans_model_auth_1.sql.query(queries_1.findOneById, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            if (result.rows.length > 0) {
                artisans_model_auth_1.sql.query(queries_1.deleteByID, [id], (err, result) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.status(200).send(`Record with ID ${id} has been deleted successfully`);
                    }
                });
            }
            else {
                res.status(404).send(`Record with ID ${id} not found`);
            }
        }
    });
};
exports.artisansDeleteMethod = artisansDeleteMethod;
