import { Document, Types } from 'mongoose';

export interface IEvent extends Document {
	title: string;
	description?: string;
	start: Date;
	end?: Date;
	status?: 'confirmed' | 'pending' | 'urgent' | 'cancelled';
	backgroundColor?: string;
	user: Types.ObjectId;
}

export interface IUser extends Document {
	username: string;
	name: string;
	passwordHash: string;
	events: Types.ObjectId[];
}
