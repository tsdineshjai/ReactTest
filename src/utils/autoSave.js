import { saveProfilesToAPI } from "./api";

export const setupAutoSave = (store) => {
	let previousProfiles = store.getState().profile.profiles;

	store.subscribe(() => {
		const currentProfiles = store.getState().profile.profiles;
		if (JSON.stringify(previousProfiles) !== JSON.stringify(currentProfiles)) {
			previousProfiles = currentProfiles;
			saveProfilesToAPI(currentProfiles);
		}
	});
};
