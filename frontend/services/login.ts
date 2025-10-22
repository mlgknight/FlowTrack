'use client';

import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/login';

interface Credentials {
	username: string;
	password: string;
}

interface LoginResponse {
	token: string;
	username: string;
	name: string;
}

const login = async (credentials: Credentials): Promise<LoginResponse> => {
	const response = await axios.post<LoginResponse>(baseUrl, credentials);
	return response.data;
};

const loginService = { login };

export default loginService;
