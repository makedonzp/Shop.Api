"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.productValidationRules = [
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),
    (0, express_validator_1.body)('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),
    (0, express_validator_1.body)('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
];
