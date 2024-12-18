import PropTypes from "prop-types";
import { Music, Gamepad2, Film, Settings } from "lucide-react";

const ProfileIcon = ({ type }) => {
	switch (type) {
		case "default":
			return <Settings size={20} />;
		case "game":
			return <Gamepad2 size={20} />;
		case "movie":
			return <Film size={20} />;
		case "music":
			return <Music size={20} />;
		default:
			return null;
	}
};

ProfileIcon.propTypes = {
	type: PropTypes.oneOf(["default", "game", "movie", "music"]),
};

export default ProfileIcon;
