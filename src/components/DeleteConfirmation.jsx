import PropTypes from "prop-types";

const DeleteConfirmation = ({ profileName, onConfirm, onCancel }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-gray-800 p-6 rounded-lg shadow-xl w-80">
				<h3 className="text-xl font-bold text-white mb-4">Delete Profile</h3>
				<p className="text-center text-gray-300 mb-6">
					Are you sure you want to delete &quot;{profileName}&quot;?
				</p>
				<div className="flex justify-end gap-4">
					<button
						onClick={onCancel}
						className="px-4 py-2 text-gray-300 hover:text-white"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

DeleteConfirmation.propTypes = {
	profileName: PropTypes.string.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
