import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_PROFILES = [
	{ id: "default", name: "Default", isDefault: true, icon: "default" },
	{ id: "game", name: "Game", isDefault: true, icon: "game" },
	{ id: "movie", name: "Movie", isDefault: true, icon: "movie" },
	{ id: "music", name: "Music", isDefault: true, icon: "music" },
];

const getInitialState = () => {
	try {
		const savedState = localStorage.getItem("profileState");
		if (savedState) {
			return JSON.parse(savedState);
		}
	} catch (error) {
		console.error("Error loading state from localStorage:", error);
	}
	return {
		profiles: DEFAULT_PROFILES,
		selectedProfileId: "default",
		isRenaming: false,
	};
};

const profileSlice = createSlice({
	name: "profile",
	initialState: getInitialState(),
	reducers: {
		selectProfile: (state, action) => {
			state.selectedProfileId = action.payload;
			state.isRenaming = false;
		},
		addProfile: (state) => {
			const newProfile = {
				id: `custom-${Date.now()}`,
				name: "New Profile",
				isDefault: false,
				icon: "default",
			};
			state.profiles.push(newProfile);
			state.selectedProfileId = newProfile.id;
			state.isRenaming = true;
		},
		deleteProfile: (state, action) => {
			const index = state.profiles.findIndex((p) => p.id === action.payload);
			if (index !== -1 && !state.profiles[index].isDefault) {
				state.profiles.splice(index, 1);
				state.selectedProfileId = state.profiles[Math.max(0, index - 1)].id;
			}
			state.isRenaming = false;
		},
		renameProfile: (state, action) => {
			const profile = state.profiles.find((p) => p.id === action.payload.id);
			if (profile && !profile.isDefault) {
				profile.name = action.payload.name.trim();
			}
			state.isRenaming = false;
		},
		setRenaming: (state, action) => {
			state.isRenaming = action.payload;
		},
		moveProfile: (state, action) => {
			const { id, direction } = action.payload;
			const index = state.profiles.findIndex((p) => p.id === id);
			if (index === -1) return;

			const newIndex = direction === "up" ? index - 1 : index + 1;
			if (newIndex >= 0 && newIndex < state.profiles.length) {
				const temp = state.profiles[index];
				state.profiles[index] = state.profiles[newIndex];
				state.profiles[newIndex] = temp;
			}
		},
	},
});

export const {
	selectProfile,
	addProfile,
	deleteProfile,
	renameProfile,
	setRenaming,
	moveProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
