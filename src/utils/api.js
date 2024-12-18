import axios from "axios";

let saveTimeout;

export const saveProfilesToAPI = async (profiles) => {
	clearTimeout(saveTimeout);

	saveTimeout = setTimeout(async () => {
		try {
			const response = await axios.post(
				"https://jsonplaceholder.typicode.com/posts",
				{
					profiles,
				}
			);
			console.log("Profiles saved to API:", response.data);
		} catch (error) {
			console.error("Error saving profiles:", error);
		}
	}, 3000);
};
