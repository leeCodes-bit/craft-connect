"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCraftByProduct = exports.updateCraft = exports.updateArtisan = exports.insertNewCraft = exports.insertToken = exports.insertNewArtisan = exports.deleteByID = exports.findOneCraftByUserId = exports.findOneToken = exports.findAllToken = exports.findAndGetAll = exports.findOneByEmail = exports.findOneById = exports.checkEmail = void 0;
//find part and select
exports.checkEmail = "SELECT s FROM Artisan WHERE s.email = $1";
exports.findOneById = "SELECT * FROM Artisan WHERE userId = $1";
exports.findOneByEmail = "SELECT * FROM Artisan WHERE email = $1";
exports.findAndGetAll = "SELECT * FROM Artisan";
exports.findAllToken = "SELECT * FROM artisan_token";
exports.findOneToken = "SELECT s FROM artisans_token WHERE s.email = $1 AND s.token = $2";
exports.findOneCraftByUserId = `SELECT s from Craft WHERE s.craftId = $1 AND s.userId = $2`;
exports.deleteByID = "DELETE s FROM Artisan WHERE s.userId = $1";
//Insert all methods
exports.insertNewArtisan = `INSERT INTO Artisan
        (userId, surname, firstname ,
          email, dob, password, phone_number, 
          state_of_origin, gender, craft,
           years_of_experience, skills_description,
             home_address
         ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13)`;
exports.insertToken = `INSERT INTO artisan_token (email, token) VALUES ($1, $2)`;
exports.insertNewCraft = `INSERT INTO Craft (craftId, userId, 
                    description, images, price_rate, 
                    charge_per_hour, product) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
//Put methods
exports.updateArtisan = `UPDATE Artisan SET 
  surname = $1,
   firstname = $2,
   dob = $3,
   password = $4,
   email = $5,
  phone_number = $6,
  state_of_origin = $7,
   gender = $8,
    craft = $9,
   years_of_experience = $10,
   skills_description = $11,
  home_address = $12  WHERE userId = $13`;
exports.updateCraft = `UPDATE Craft SET 
        description =$1,
        images = $2,
        price_rate = $3,
        charge_per_hour = $4,
        product = $5 WHERE userId = $6`;
//delete method doesn't exist for the user/artisan but the functionality will be created for admin
exports.deleteFromCraftByProduct = `DELETE FROM Craft WHERE 
product = $1 AND userId = $2`;
