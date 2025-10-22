import type { Request, Response } from 'express';
import Note from '../models/Event.ts';
import User from '../models/User.ts';

export const resetDB = async (req: Request, res: Response) => {
	await Note.deleteMany({});

	res.status(204).end();
};
