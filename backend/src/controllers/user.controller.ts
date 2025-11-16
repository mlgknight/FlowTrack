import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/User.ts';
import Event from '../models/Event.ts';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Event,
					as: 'events',
					attributes: ['id', 'title', 'backgroundColor', 'status', 'description', 'start', 'end'],
				},
			],
		});
		res.json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Failed to fetch users' });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.id },
			include: [
				{
					model: Event,
					as: 'events',
					attributes: ['id', 'title', 'backgroundColor', 'status', 'description', 'start', 'end'],
				},
			],
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ error: 'Failed to fetch user' });
	}
};

export const addNewUser = async (req: Request, res: Response) => {
	try {
		const { username, name, password } = req.body;

		if (!username || !name || !password) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const existingUser = await User.findOne({
			where: { username },
		});

		if (existingUser) {
			return res.status(400).json({ error: 'Username already exists' });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const savedUser = await User.create({
			username,
			name,
			passwordHash,
		});

		if (!process.env.SECRET) {
			return res.status(500).json({
				error: 'server configuration error',
			});
		}

		const userForToken = {
			username: savedUser.username,
			id: savedUser.id.toString(),
		};

		const token = jwt.sign(userForToken, process.env.SECRET, {
			expiresIn: '7d',
		});

		res.status(201).json({
			token,
			username: savedUser.username,
			name: savedUser.name,
			id: savedUser.id,
		});
	} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ error: 'Failed to create user' });
	}
};