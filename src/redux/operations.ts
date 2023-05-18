import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://64523c76a2860c9ed405b95c.mockapi.io/api/v1";

interface FetchUsersParametrs {
	page: number,
	limit: number,
	controller?: AbortController,
}

export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async ({ page, limit, controller } : FetchUsersParametrs, thunkAPI) => {
		try {
			const response = await axios.get("users", {
				signal: controller?.signal,
				params: {
					page,
					limit,
				}
			});
			return response.data;
		} catch (error) {
			if (axios.isCancel(error)) {
				console.log(error);
			}
			return thunkAPI.rejectWithValue(error);
		}
	}
);

interface toggleFollowParametrs {
	id: string,
	followStatus: string
}

export const toggleFollow = createAsyncThunk(
	"users/toggleFollow",
	async ({ id, followStatus }: toggleFollowParametrs, thunkAPI) => {
		try {
			const { data } = await axios.get(`users/${id}`);
			const updatedFollowers = followStatus === "Follow" ? data.followers + 1 : data.followers - 1;
			const response = await axios.put(`users/${id}`, { ...data, followers: updatedFollowers });
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error);
		}
	}
);
