import { Router } from 'express';
import { addNewUser, getAllUsers, getUser } from '../controllers/user.controller.ts'


const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', addNewUser);









export default userRouter;
