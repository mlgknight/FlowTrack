import type { Request, Response } from 'express';
import Event from '../models/Event.ts';

export const resetDB = async (req: Request, res: Response) => {
	await Event.destroy({});

	res.status(204).end();
};
