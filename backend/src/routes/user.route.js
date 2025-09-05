import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';


const router = express.router();

// apply middleware to all routes
router.use(protectRoute);
router.get('/', getRcommendedUsers); 
router.get('/friends', getMyFriends);


export default router