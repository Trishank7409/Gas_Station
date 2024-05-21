const API_KEY = 'AIzaSyDDfm-g29isNVY2tCEZEMF2IRlvSQ8TKgc';

interface GeocodeResponse {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            };
        };
    }[];
    status: string;
}

async function getCoordinates(placeName: any): Promise<{ lat: number; lng: number } | null> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GeocodeResponse = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            console.error('Geocoding API error:', data.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
    }
}


export default getCoordinates

// Example usage:
// (async () => {
//     const placeName = 'Eiffel Tower';
//     const coordinates = await getCoordinates(placeName);

//     if (coordinates) {
//         console.log(`Coordinates of ${placeName}:`, coordinates);
//     } else {
//         console.log('Could not get coordinates.');
//     }
// })();
