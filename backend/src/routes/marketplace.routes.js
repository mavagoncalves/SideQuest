import express from 'express';


import {
    getMarketPlaceUsers,
    getMarketPlaceUserById
} from '../controllers/marketplace.controller.js';


const router = express.Router();

router.get('/', getMarketPlaceUsers);
router.get('/:id', getMarketPlaceUserById);

export default router;