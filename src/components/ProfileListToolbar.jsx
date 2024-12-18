import PropTypes from "prop-types";
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";

const ProfileListToolbar = ({
	selectedProfile,
	selectedIndex,
	totalProfiles,
	onAdd,
	onEdit,
	onDelete,
	onMove,
}) => {
	const canMoveUp = selectedIndex > 0;
	const canMoveDown = selectedIndex < totalProfiles - 1;

	return (
		<div className="p-4 border-t border-gray-700 flex items-center justify-between">
			<button
				onClick={onAdd}
				className="text-white hover:text-green-400"
				title="Add Profile"
			>
				<Plus size={20} />
			</button>

			{selectedProfile && !selectedProfile.isDefault && (
				<>
					<button
						onClick={onEdit}
						className="text-white hover:text-blue-400"
						title="Rename Profile"
					>
						<Edit2 size={20} />
					</button>
					<button
						onClick={onDelete}
						className="text-white hover:text-red-400"
						title="Delete Profile"
					>
						<Trash2 size={20} />
					</button>
				</>
			)}

			<div className="flex gap-2">
				<button
					onClick={() => onMove("up")}
					disabled={!canMoveUp}
					className={clsx(
						"text-white",
						canMoveUp ? "hover:text-blue-400" : "opacity-50 cursor-not-allowed"
					)}
					title="Move Up"
				>
					<ChevronUp size={20} />
				</button>
				<button
					onClick={() => onMove("down")}
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
	);
};

ProfileListToolbar.propTypes = {
	selectedProfile: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		isDefault: PropTypes.bool.isRequired,
	}),
	selectedIndex: PropTypes.number.isRequired,
	totalProfiles: PropTypes.number.isRequired,
	onAdd: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onMove: PropTypes.func.isRequired,
};

export default ProfileListToolbar;
