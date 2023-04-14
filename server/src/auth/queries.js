"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewArtisan = exports.findAndGetAll = exports.findOneByEmail = exports.findOneById = exports.checkEmail = void 0;
//find part and select
exports.checkEmail = "SELECT s FROM artisans WHERE s.email = $1";
exports.findOneById = "SELECT * FROM artisans WHERE id = $1";
exports.findOneByEmail = "SELECT * FROM artisans WHERE email = $1";
exports.findAndGetAll = "SELECT * FROM artisans";
//Insert all methods
exports.insertNewArtisan = `INSERT INTO artisans 
        (id, surname, firstname ,
          email, password, phone_number, 
          state_of_origin, gender, craft,
           years_of_experience, skills_description,
             home_address, image
         ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11, $12, $13)`;
