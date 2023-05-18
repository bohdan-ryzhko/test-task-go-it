import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://64523c76a2860c9ed405b95c.mockapi.io/api/v1";

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (
		{ page, limit, controller } : { page: number, limit: number, controller: AbortController },
		thunkAPI
	) => {
		try {
			const response = await axios.get("users", {
				signal: controller.signal,
				params: {
					page,
					limit,
				}
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
