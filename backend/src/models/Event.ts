import mongoose, { Document, Schema, Model } from 'mongoose';
import type { IEvent } from '../utils/types.ts';

const eventSchema = new Schema<IEvent>({
	title: { type: String, required: true, minlength: 3 },
	description: { type: String },
	start: { type: Date, required: true },
	end: { type: Date }, // optional for all-day events
	status: {
		type: String,
		enum: ['confirmed', 'pending', 'urgent', 'cancelled'],
		default: 'confirmed',
	},
	backgroundColor: { type: String, default: '#3B82F6' }, // Optional, for calendar color
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

eventSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Event: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
