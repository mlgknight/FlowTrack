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
	id: number;
}

export const getAllEvents = async (req: Request, res: Response) => {
	try {
		const events = await Event.findAll({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'username'],
				},
			],
		});
		res.json(events);
	} catch (error) {
		console.error('Error fetching events:', error);
		res.status(500).json({ error: 'Failed to fetch events' });
	}
};

export const getSingleEvent = async (req: Request, res: Response) => {
	try {
		const event = await Event.findOne({
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'username'],
				},
			],
			where: { id: req.params.id },
		});

		if (event) {
			res.json(event);
		} else {
			res.status(404).json({ error: 'Event not found' });
		}
	} catch (error) {
		console.error('Error fetching event:', error);
		res.status(500).json({ error: 'Failed to fetch event' });
	}
};

export const addNewEvent = async (req: Request, res: Response) => {
	try {
		const { title, description, start, end, status, backgroundColor } =
			req.body;

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

		const user = await User.findByPk(decodedToken.id);
		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		if (!title || !start) {
			return res
				.status(400)
				.json({ error: 'Title and start date are required' });
		}

		const event = await Event.create({
			title,
			description,
			start,
			end,
			status: status || 'confirmed',
			backgroundColor: backgroundColor || '#3B82F6',
			userId: user.id,
		});

		const eventWithUser = await Event.findByPk(event.id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'username'],
				},
			],
		});

		res.status(201).json(eventWithUser);
	} catch (error) {
		console.error('Error creating event:', error);
		res.status(500).json({ error: 'Failed to create event' });
	}
};

export const deleteEvent = async (req: Request, res: Response) => {
	try {
		const deletedEvent = await Event.findOne({ where: { id: req.params.id } });

		if (!deletedEvent) {
			return res.status(404).json({ error: 'Event not found' });
		}

		await deletedEvent.destroy();
		res.status(204).end();
	} catch (error) {
		console.error('Error deleting event:', error);
		res.status(500).json({ error: 'Failed to delete event' });
	}
};

export const updateEvent = async (req: Request, res: Response) => {
	try {
		const { title, description, start, end, status, backgroundColor } =
			req.body;

		const event = await Event.findOne({ where: { id: req.params.id } });
		if (!event) {
			return res.status(404).json({ error: 'Event not found' });
		}


		await event.update({
			...(title !== undefined && { title }),
			...(description !== undefined && { description }),
			...(start !== undefined && { start }),
			...(end !== undefined && { end }),
			...(status !== undefined && { status }),
			...(backgroundColor !== undefined && { backgroundColor }),
		});

		const updatedEvent = await Event.findByPk(event.id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'username'],
				},
			],
		});

		res.json(updatedEvent);
	} catch (error) {
		console.error('Error updating event:', error);
		res.status(500).json({ error: 'Failed to update event' });
	}
};
