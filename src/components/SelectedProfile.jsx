import { useSelector } from "react-redux";

const SelectedProfile = () => {
	const { profiles, selectedProfileId } = useSelector((state) => state.profile);
	const selectedProfile = profiles.find((p) => p.id === selectedProfileId);

	return (
		<div className="flex-1 p-8">
			<h1 className="text-3xl font-bold text-white">{selectedProfile?.name}</h1>
		</div>
	);
};

export default SelectedProfile;
