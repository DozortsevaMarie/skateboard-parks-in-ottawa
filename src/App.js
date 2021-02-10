import React, {useEffect, useState} from "react";
import ReactMapGL, {Marker, NavigationControl, Popup} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import style from "./App.module.css";
import * as parkDate from "./data/Skateboard_Parks.json";


function App() {
	const [viewport, setViewport] = useState({
		latitude: 45.421106,
		longitude: -75.690308,
		zoom: 10,
		width: "100vw",
		height: "100vh",
	});
	const [selectedPark, setSelectedPark] = useState(null);
	useEffect(() => {
		const listener = (e) => {
			if (e.key === "Escape") {
				setSelectedPark(null);
			}
		};
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, [])
	return (
		<div>
			<ReactMapGL {...viewport}
						mapboxApiAccessToken={"pk.eyJ1IjoibWFyaWVkb3pvcnRzZXZhIiwiYSI6ImNra3pkem4yeTVscWcyb3F0MzU1aGNmOWsifQ.cmJsCseA_zCexldAxW1xFg"}
						mapStyle="mapbox://styles/mapbox/streets-v9"
						onViewportChange={nextViewport => setViewport(nextViewport)}>
				{parkDate.features.map(park => (
					<Marker key={park.properties.PARK_ID} latitude={park.geometry.coordinates[1]}
							longitude={park.geometry.coordinates[0]}>
						<button className={style.markerButton} onClick={(e) => {
							e.preventDefault();
							setSelectedPark(park)
						}}>
							<img src="/skateboard.svg" alt="Skate Park Icon"/>
						</button>
					</Marker>
				))}
				{selectedPark && (
					<Popup latitude={selectedPark.geometry.coordinates[1]}
						   longitude={selectedPark.geometry.coordinates[0]}
						   onClose={() => setSelectedPark(null)}
						   captureScroll>
						<div>
							<h2>{selectedPark.properties.NAME}</h2>
							<p>{selectedPark.properties.ADDRESS}</p>
							<p>{selectedPark.properties.DESCRIPTION}</p>
						</div>
					</Popup>
				)}
				<NavigationControl ></NavigationControl>
			</ReactMapGL>
		</div>
	);
}

export default App;
