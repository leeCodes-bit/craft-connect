"use strict";
// import { Request, Response } from "express";
// import { artisans } from "../auth/artisans.model.auth";
// import { craft } from "../auth/craft.model.auth";
// export default class AdminController {
//     public async createArtisan(req: Request, res: Response): Promise<void> {
//         try {
//             const { surname, firstname, dob, email, password, password2, phone_number, state_of_origin, gender, craft, years_of_experience, skills_description, home_address, } = req.body;
//             const Artisan = await artisans.create({ surname, firstname, dob, email, password, password2, phone_number, state_of_origin, gender, craft, years_of_experience, skills_description, home_address });
//             res.status(200).json({ Artisan });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
//     public async getArtisans(req: Request, res: Response): Promise<void> {
//         try {
//             const allartisans = artisans.findAll({
//                 include: [craft]
//             });
//         res.json({ allartisans})
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
//     public async getArtisan(req: Request, res: Response): Promise<void> {
//         try {
//             const id = parseInt(req.params.id);
//             const artisan = await artisans.findByPk(id, { include: [craft] });
//             if (!artisan) {
//                 res.status(404).json({ message: 'artisan not found' });
//             } else {
//                 res.json({ artisan });
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
//     public async updateArtisan(req: Request, res: Response): Promise<void> {
//         try {
//             const id = parseInt(req.params.id);
//             const { surname, firstname, dob, email, password, password2, phone_number, state_of_origin, gender, craft, years_of_experience, skills_description, home_address } = req.body;
//             const artisan = await artisans
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Server error' });
//         }
//     }
// }
