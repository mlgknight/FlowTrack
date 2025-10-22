'use client';

import axios from 'axios';
import type { Event } from '../types';

const baseUrl = 'http://localhost:3001/api/events';

let token: string | null = null;
let isInitialized = false;

const initializeToken = () => {
	if (isInitialized || typeof window === 'undefined') return;

	try {
		const loggedUserJSON = window.localStorage.getItem('loggedEventappUser');
		if (loggedUserJSON) {
			const LoggedInUser = JSON.parse(loggedUserJSON);
			token = `Bearer ${LoggedInUser.token}`;
		}
		isInitialized = true;
	} catch (error) {
		console.error('Failed to initialize token:', error);
	}
};

const setToken = (newToken: string | null) => {
	token = newToken ? `Bearer ${newToken}` : null;
	isInitialized = true;
};

const getAll = async () => {
	initializeToken();
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (error) {
		console.log(`Unable to fetch Events ${error}`);
		throw error;
	}
};

const create = async (newObject: Event) => {
	initializeToken();
	const config = {
		headers: { Authorization: token },
	};
	try {
		const response = await axios.post(baseUrl, newObject, config);
		return response.data;
	} catch (error) {
		console.error(`Unable to create Event ${error}`);
		throw error;
	}
};

const update = async (id: string, newObject: Event) => {
	initializeToken(); // Initialize lazily when first API call is made
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObject);
		return response.data;
	} catch (error) {
		console.error(`Unable to Update Event ${error}`);
		throw error;
	}
};

const eventService = {
	getAll,
	create,
	update,
	setToken,
};

export default eventService;
