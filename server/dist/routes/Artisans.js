"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artisans_model_auth_1 = require("../auth/artisans.model.auth");
const artisan_ctrl_1 = require("../controllers/artisan.ctrl");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', artisan_ctrl_1.artisansGetMethod);
router.post('/', artisan_ctrl_1.artisansPostMethod);
router.get('/login', artisan_ctrl_1.artisansLoginGetMethod);
router.post('/login', artisan_ctrl_1.artisansLoginPostMethod);
router.get('/:email', artisan_ctrl_1.artisansGetPutMethod);
router.put('/update', artisans_model_auth_1.verifyToken, artisan_ctrl_1.artisansPutMethod);
router.delete('/:id', artisans_model_auth_1.verifyToken, artisan_ctrl_1.artisansDeleteMethod);
exports.default = router;
