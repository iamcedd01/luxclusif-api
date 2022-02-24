import { Router } from 'express';

import ProductRoutes from './products';

const router: Router = Router();

router.use('/products', ProductRoutes);

export default router;
