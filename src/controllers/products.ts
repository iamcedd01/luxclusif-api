import { matchedData } from 'express-validator';
import { NextFunction, Request, Response, Router } from 'express';

// MIDDLEWARES
import validator from '../middlewares/validators';
import authentication from '../middlewares/authentication';
import { IProductCreate, IProductUpdate } from '../models/products/interface';
import { create_product, get_by_id, search_products, update_product } from '../models/products';
import {
    createProductValidationRules,
    updateProductValidationRules,
} from '../middlewares/validators/product';

type SearchQueryProps = {
    page: number;
    limit: number;
    search: string;
};

const router: Router = Router();
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

/**
 * method: GET
 * route: /products
 * description: Get all products
 */
router.get(
    '/',
    authentication.optional,
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            search,
            page = DEFAULT_PAGE,
            limit = DEFAULT_LIMIT,
        } = req.query as unknown as SearchQueryProps;

        await search_products({ page: Number(page), limit: Number(limit), search })
            .then(data => res.json({ products: data.products, ...data }))
            .catch(next);
    }
);

/**
 * method: GET
 * route: /products/:id
 * description: Get product by id
 */
router.get(
    '/:id',
    authentication.optional,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id as string;

        await get_by_id(id)
            .then(product => res.json(product))
            .catch(next);
    }
);

/**
 * method: POST
 * route: /products
 * description: Create new product
 */
router.post(
    '/',
    authentication.optional,
    createProductValidationRules(),
    validator,
    async (req: Request, res: Response, next: NextFunction) => {
        const data = matchedData(req);
        console.log({ data });
        await create_product(data as IProductCreate)
            .then(() => res.json({ success: true }))
            .catch(next);
    }
);

/**
 * method: PATCH
 * route: /products/:id
 * description: Update product
 */
router.patch(
    '/:id',
    authentication.optional,
    updateProductValidationRules(),
    validator,
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const data = matchedData(req);
        await update_product({ id, ...data } as IProductUpdate)
            .then(() => res.json({ success: true }))
            .catch(next);
    }
);

export default router;
