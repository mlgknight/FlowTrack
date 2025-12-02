import { Router } from 'express';
import { addNewUser, getAllUsers, getUser, updateUser} from '../controllers/user.controller.ts'


const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', addNewUser);
userRouter.put('/:id', updateUser);









export default userRouter;
