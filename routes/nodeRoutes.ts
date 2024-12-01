import express from 'express';
import nodeController from '../controllers/nodeContoller';
import { authenticateUser } from '../middleware/authenticateUser';

const router = express.Router();

//노드 데이터 가져오기
router.get('/tree', authenticateUser, nodeController.getNode);

router.put('/tree/update', authenticateUser, nodeController.getNode);
export default router;
