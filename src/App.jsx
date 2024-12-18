import ProfileList from "./components/ProflieList";
import SelectedProfile from "./components/SelectedProfile";

function App() {
	return (
		<div className="min-h-screen bg-gray-900 flex">
			<ProfileList />

			<SelectedProfile />
		</div>
	);
}

export default App;
