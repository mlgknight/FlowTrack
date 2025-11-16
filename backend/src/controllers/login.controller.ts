import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import User from '../models/User.ts';
import 'dotenv/config';

export const addNewLogin = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const user = await User.scope('withPassword').findOne({
		where: { username },
	});

	// Check if user exists and has a password hash
	const passwordCorrect =
		user === null || !user.passwordHash
			? false
			: await bcrypt.compare(password, user.passwordHash);
	console.log('Password sent:', password);
	console.log('PasswordHash in DB:', user?.passwordHash);
	console.log(
		'Compare:',
		await bcrypt.compare(password, user?.passwordHash || '')
	);

	if (!(user && passwordCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password',
		});
	}

	// Check for SECRET before creating token
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

	res.status(200).send({
		token,
		username: user.username,
		name: user.name,
	});
};
