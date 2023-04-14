"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const artisans_model_auth_1 = require("./auth/artisans.model.auth");
const craft_model_auth_1 = require("./auth/craft.model.auth");
const Homepage_1 = __importDefault(require("./routes/Homepage"));
const Crafts_1 = __importDefault(require("./routes/Crafts"));
const Artisans_1 = __importDefault(require("./routes/Artisans"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use('/', Homepage_1.default);
app.use('/crafts', Crafts_1.default);
app.use('/artisans', Artisans_1.default);
//for creating tables
app.get('/createArtisan', artisans_model_auth_1.createArtisanTable);
app.get('/createCraft', craft_model_auth_1.createCraftTable);
app.get('/createToken', artisans_model_auth_1.createArtisanToken);
exports.default = app;
