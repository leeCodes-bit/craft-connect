"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artisans_model_auth_1 = require("../auth/artisans.model.auth");
const craft_ctrl_1 = require("../controllers/craft.ctrl");
const router = express_1.default.Router();
/* GET users listing. */
router.get('/', craft_ctrl_1.craftGetMethod);
router.post('/post', artisans_model_auth_1.verifyToken, craft_ctrl_1.craftPostMethod);
router.delete('/delete/:product', artisans_model_auth_1.verifyToken, craft_ctrl_1.craftDeleteMethod);
router.put('/update', artisans_model_auth_1.verifyToken, craft_ctrl_1.craftUpdateMethod);
exports.default = router;
