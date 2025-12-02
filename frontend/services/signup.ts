'use client';

import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

interface Credentials {
	username: string;
    name: string;
	password: string;
}

interface SignupResponse {
	token: string;
	username: string;
	name: string;
	id: number;
}

const signup = async (credentials: Credentials): Promise<SignupResponse> => {
	const response = await axios.post<SignupResponse>(baseUrl, credentials);
	return response.data;
};

const signupService = { signup };

export default signupService;
