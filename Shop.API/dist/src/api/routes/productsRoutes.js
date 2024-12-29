"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController"); // Исправлено на productsController
const productValidator_1 = require("../../validators/productValidator");
const router = express_1.default.Router();
router.get('/', productsController_1.getProducts);
router.get('/:id', productsController_1.getProductById);
router.post('/', productValidator_1.productValidationRules, productsController_1.createProduct);
router.put('/:id', productValidator_1.productValidationRules, productsController_1.updateProduct);
router.delete('/:id', productsController_1.deleteProduct);
exports.default = router;
