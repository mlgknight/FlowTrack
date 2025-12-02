import axios from 'axios';
import type { User } from '../types';

const baseUrl = 'http://localhost:3001/api/users';

// update accepts partial user fields (username/name)
const update = async (
	id: number,
	newObject: Partial<Pick<User, 'username' | 'name'>>
) => {
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObject);
		return response.data;
	} catch (error) {
		console.error(`Unable to Update User ${error}`);
		throw error;
	}
};

const userService = { update };

export default userService;
