import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
    GoogleMap,
    LoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

// Default center position (San Francisco)
const defaultCenter = {
    lat: 10.771853,
    lng: 106.658045,
};

const LocationMap = ({
    apiKey,
    center = defaultCenter,
    zoom = 10,
    markers = [],
}) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [mapInstance, setMapInstance] = useState(null);

    const onLoad = useCallback(function callback(map) {
        // The map instance is ready
        setMapInstance(map);
    }, []);

    const onUnmount = useCallback(function callback() {
        // Cleanup when component unmounts
        setMapInstance(null);
    }, []);

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Child components like markers go here */}
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        onClick={() => setSelectedMarker(marker)}
                    />
                ))}

                {selectedMarker && (
                    <InfoWindow
                        position={selectedMarker.position}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div>
                            <h3>{selectedMarker.title}</h3>
                            <p>{selectedMarker.description}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

LocationMap.propTypes = {
    apiKey: PropTypes.string.isRequired,
    center: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),
    zoom: PropTypes.number,
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.shape({
                lat: PropTypes.number.isRequired,
                lng: PropTypes.number.isRequired,
            }).isRequired,
            title: PropTypes.string,
            description: PropTypes.string,
        }),
    ),
};

export default LocationMap;
