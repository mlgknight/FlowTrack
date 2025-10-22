import type { Request, Response } from 'express';
import Event from '../models/Event.ts';
import User from '../models/User.ts';
import jwt from 'jsonwebtoken';

const getTokenFrom = (req: Request): string => {
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	throw new Error('Token missing');
};

interface DecodedToken extends jwt.JwtPayload {
	id: string;
}

// ✅ GET all events
export const getAllEvents = async (req: Request, res: Response) => {
	const events = await Event.find({})
		.populate('user', { username: 1, name: 1 })
		.sort({ _id: -1 });

	res.json(events);
};

// ✅ GET single event
export const getSingleEvent = async (req: Request, res: Response) => {
	const event = await Event.findById(req.params.id);

	if (event) {
		res.json(event);
	} else {
		res.status(404).json({ error: 'Event not found' });
	}
};

// ✅ POST new event
export const addNewEvent = async (req: Request, res: Response) => {
	const { title, description, start, end, status, backgroundColor } = req.body;

	const secret = process.env.SECRET;
	if (!secret) {
		return res.status(500).json({ error: 'SECRET key is missing' });
	}

	let decodedToken: DecodedToken;
	try {
		decodedToken = jwt.verify(getTokenFrom(req), secret) as DecodedToken;
	} catch {
		return res.status(401).json({ error: 'Invalid or expired token' });
	}

	const user = await User.findById(decodedToken.id);
	if (!user) {
		return res.status(400).json({ error: 'User not found' });
	}

	if (!title || !start) {
		return res.status(400).json({ error: 'Title and start date are required' });
	}

	const event = new Event({
		title,
		description,
		start,
		end,
		status: status || 'confirmed',
		backgroundColor: backgroundColor || '#3B82F6',
		user: user._id,
	});

	const savedEvent = await event.save();
	user.events = user.events.concat(savedEvent.id);
	await user.save();

	res.status(201).json(savedEvent);
};

// ✅ DELETE event
export const deleteEvent = async (req: Request, res: Response) => {
	await Event.findByIdAndDelete(req.params.id);
	res.status(204).end();
};

// ✅ PUT/PATCH update event
export const updateEvent = async (req: Request, res: Response) => {
	const { title, description, start, end, status, backgroundColor } = req.body;

	const event = await Event.findById(req.params.id);
	if (!event) {
		return res.status(404).json({ error: 'Event not found' });
	}

	if (title !== undefined) event.title = title;
	if (description !== undefined) event.description = description;
	if (start !== undefined) event.start = start;
	if (end !== undefined) event.end = end;
	if (status !== undefined) event.status = status;
	if (backgroundColor !== undefined) event.backgroundColor = backgroundColor;

	const updatedEvent = await event.save();
	res.json(updatedEvent);
};
