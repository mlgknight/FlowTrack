import { Router } from 'express';
import {
   getAllEvents,
   addNewEvent,
   getSingleEvent,
   deleteEvent,
   updateEvent,
} from '../controllers/event.controller.ts';

const noteRouter = Router();

noteRouter.get('/', getAllEvents);

noteRouter.post('/', addNewEvent);

noteRouter.get('/:id', getSingleEvent);

noteRouter.delete('/:id', deleteEvent);

noteRouter.put('/:id', updateEvent);

export default noteRouter;
