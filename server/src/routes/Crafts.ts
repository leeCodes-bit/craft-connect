import express from 'express';
import { verifyToken } from '../auth/artisans.model.auth';
import { craftGetMethod, craftPostMethod, craftDeleteMethod, craftUpdateMethod } from '../controllers/craft.ctrl';
const router = express.Router();

/* GET users listing. */
router.get('/',craftGetMethod)
router.post('/post', verifyToken,craftPostMethod)
router.delete('/delete/:product', verifyToken,craftDeleteMethod)
router.put('/update', verifyToken,craftUpdateMethod)

export default router;
