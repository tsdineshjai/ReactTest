import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { renameProfile } from "../store/slices/profileSlice";
import ProfileIcon from "./icons/ProfileIcon";

const ProfileItem = ({ profile, isSelected, onSelect }) => {
	const dispatch = useDispatch();
	const isRenaming = useSelector((state) => state.profile.isRenaming);
	const [editName, setEditName] = useState(profile.name);
	const inputRef = useRef(null);

	useEffect(() => {
		if (isRenaming && isSelected && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isRenaming, isSelected]);

	const handleRename = (e) => {
		if (e.key === "Enter") {
			const trimmedName = editName.trim();
			if (trimmedName) {
				dispatch(renameProfile({ id: profile.id, name: trimmedName }));
			} else {
				setEditName(profile.name); // Reset to original name if empty
			}
		}
	};

	const handleBlur = () => {
		const trimmedName = editName.trim();
		if (trimmedName) {
			dispatch(renameProfile({ id: profile.id, name: trimmedName }));
		} else {
			setEditName(profile.name);
		}
	};

	return (
		<div
			className={clsx(
				"flex items-center p-4 cursor-pointer transition-colors duration-200",
				isSelected ? "bg-green-600" : "hover:bg-gray-700",
				"border-b border-gray-700"
			)}
			onClick={onSelect}
		>
			<div className="text-white">
				<ProfileIcon type={profile.icon} />
			</div>
			{isRenaming && isSelected ? (
				<input
					ref={inputRef}
					type="text"
					value={editName}
					onChange={(e) => setEditName(e.target.value)}
					onKeyDown={handleRename}
					onBlur={handleBlur}
					className="ml-2 bg-transparent text-white outline-none w-full"
					maxLength={25}
					placeholder="Enter Profile Name"
					onClick={(e) => e.stopPropagation()}
				/>
			) : (
				<span className="ml-2 text-white truncate">{profile.name}</span>
			)}
		</div>
	);
};

ProfileItem.propTypes = {
	profile: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		isDefault: PropTypes.bool.isRequired,
		icon: PropTypes.string,
	}).isRequired,
	isSelected: PropTypes.bool.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default ProfileItem;
