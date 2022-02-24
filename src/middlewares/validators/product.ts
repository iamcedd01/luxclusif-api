import { body } from 'express-validator';

import { Product } from '../../models/products/schema';

export const createProductValidationRules = () => [
    body('sku')
        .optional({ checkFalsy: true })
        .custom(value => {
            return new Promise((resolve, reject) => {
                Product.findOne({ sku: value }).then(product => {
                    return product ? reject() : resolve('');
                });
            });
        })
        .withMessage('SKU already exists'),
    body('name').notEmpty({ ignore_whitespace: true }).withMessage('Product Name is required'),
    body('brand').notEmpty({ ignore_whitespace: true }).withMessage('Product Brand is required'),
    body('category')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('Product Category is required'),
    body('price')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('Price is required')
        .bail()
        .isCurrency({ allow_decimal: true })
        .withMessage('Price is invalid. Only accepts currency formatted values.'),
    body('compare_at_price')
        .optional({ checkFalsy: true })
        .isCurrency({ allow_decimal: true })
        .withMessage('Compare at Price is invalid. Only accepts currency formatted values.'),
    body('options').optional({ checkFalsy: true }),
    body('media').optional({ checkFalsy: true }),
    body('description').optional({ checkFalsy: true }),
];

export const updateProductValidationRules = () => [
    body('sku')
        .optional({ checkFalsy: true })
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                Product.findOne({ sku: value }).then(product => {
                    console.log({ product, req: req.params, value });
                    if (product && product._id.toString() === req.params.id) {
                        return resolve('');
                    }
                    return product ? reject() : resolve('');
                });
            });
        })
        .withMessage('SKU already exists'),
    body('name').notEmpty({ ignore_whitespace: true }).withMessage('Product Name is required'),
    body('brand').notEmpty({ ignore_whitespace: true }).withMessage('Product Brand is required'),
    body('category')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('Product Category is required'),
    body('price')
        .notEmpty({ ignore_whitespace: true })
        .withMessage('Price is required')
        .bail()
        .isCurrency({ allow_decimal: true })
        .withMessage('Price is invalid. Only accepts currency formatted values.'),
    body('compare_at_price')
        .optional({ checkFalsy: true })
        .isCurrency({ allow_decimal: true })
        .withMessage('Compare at Price is invalid. Only accepts currency formatted values.'),
    body('options').optional({ checkFalsy: true }),
    body('media').optional({ checkFalsy: true }),
    body('description').optional({ checkFalsy: true }),
];
