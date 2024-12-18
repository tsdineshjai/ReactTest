import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer from "./slices/profileSlice";
import { setupAutoSave } from "../utils/autoSave";

export const store = configureStore({
	reducer: {
		profile: ProfileReducer,
	},
});

store.subscribe(() => {
	localStorage.setItem(
		"profileState",
		JSON.stringify(store.getState().profile)
	);
});

// Setup auto-save
setupAutoSave(store);
