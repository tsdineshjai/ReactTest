import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";
import {
	selectProfile,
	addProfile,
	deleteProfile,
	moveProfile,
	setRenaming,
} from "../store/slices/profileSlice";
import ProfileItem from "./ProfileItem";
import DeleteConfirmation from "./DeleteConfirmation";

const ProfileList = () => {
	const dispatch = useDispatch();
	const { profiles, selectedProfileId } = useSelector((state) => state.profile);
	const selectedProfile = profiles.find((p) => p.id === selectedProfileId);
	const selectedIndex = profiles.findIndex((p) => p.id === selectedProfileId);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	const handleMove = (direction) => {
		if (selectedProfileId) {
			dispatch(moveProfile({ id: selectedProfileId, direction }));
		}
	};

	const handleDelete = () => {
		if (selectedProfile && !selectedProfile.isDefault) {
			setShowDeleteConfirm(true);
		}
	};

	const confirmDelete = () => {
		dispatch(deleteProfile(selectedProfileId));
		setShowDeleteConfirm(false);
	};

	const canMoveUp = selectedIndex > 0;
	const canMoveDown = selectedIndex < profiles.length - 1;

	return (
		<div className="w-72 bg-gray-800 h-screen flex flex-col">
			<div className="p-4 text-white text-xl font-bold border-b border-gray-700">
				Profile List
			</div>

			<div className="flex-1 overflow-auto">
				{profiles.map((profile) => (
					<ProfileItem
						key={profile.id}
						profile={profile}
						isSelected={profile.id === selectedProfileId}
						onSelect={() => dispatch(selectProfile(profile.id))}
					/>
				))}
			</div>

			<div className="p-4 border-t border-gray-700 flex items-center justify-between">
				<button
					onClick={() => dispatch(addProfile())}
					className="text-white hover:text-green-400"
					title="Add Profile"
				>
					<Plus size={20} />
				</button>

				{selectedProfile && !selectedProfile.isDefault && (
					<>
						<button
							onClick={() => dispatch(setRenaming(true))}
							className="text-white hover:text-blue-400"
							title="Rename Profile"
						>
							<Edit2 size={20} />
						</button>
						<button
							onClick={handleDelete}
							className="text-white hover:text-red-400"
							title="Delete Profile"
						>
							<Trash2 size={20} />
						</button>
					</>
				)}

				<div className="flex gap-2">
					<button
						onClick={() => handleMove("up")}
						disabled={!canMoveUp}
						className={clsx(
							"text-white",
							canMoveUp
								? "hover:text-blue-400"
								: "opacity-50 cursor-not-allowed"
						)}
						title="Move Up"
					>
						<ChevronUp size={20} />
					</button>
					<button
						onClick={() => handleMove("down")}
						disabled={!canMoveDown}
						className={clsx(
							"text-white",
							canMoveDown
								? "hover:text-blue-400"
								: "opacity-50 cursor-not-allowed"
						)}
						title="Move Down"
					>
						<ChevronDown size={20} />
					</button>
				</div>
			</div>

			{showDeleteConfirm && (
				<DeleteConfirmation
					profileName={selectedProfile.name}
					onConfirm={confirmDelete}
					onCancel={() => setShowDeleteConfirm(false)}
				/>
			)}
		</div>
	);
};

export default ProfileList;
