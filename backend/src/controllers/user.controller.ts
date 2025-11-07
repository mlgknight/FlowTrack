import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/User.ts';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req: Request, res: Response) => {
	const users = await User.find({}).populate('events', {
		content: 1,
		important: 1,
	});
	res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id).populate('events', {});

	res.json(user);
};

export const addNewUser = async (req: Request, res: Response) => {
	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
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
		username: user.username,
		id: user.id.toString(), // Convert ObjectId to string
	};

	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: '7d',
	});

	const existingUser = await User.findOne({ username: user.username });

	if (existingUser) {
		return res.status(400).json({ error: 'Username already exists' });
	}

	const savedUser = await user.save();
	res.status(201).json({
		token,
		username: savedUser.username,
		name: savedUser.name,
	});
};
