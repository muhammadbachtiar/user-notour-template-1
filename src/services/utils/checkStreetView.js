import { useEffect, useState } from 'react';


const StreetViewChecker = ({ lat, lng }) => {
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('googleMapsScript');

      if (!existingScript) {
        if (!document.getElementById('googleMapsScript')) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GMAPS_API_KEY}&libraries=places`;
          script.id = 'googleMapsScript';
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
        }
      } else {
        checkStreetViewAvailability(lat, lng);
      }
    };

    const checkStreetViewAvailability = (lat, lng) => {
      if (window.google && window.google.maps) {
        const sv = new window.google.maps.StreetViewService();
        const location = { lat, lng };
        sv.getPanorama({ location, radius: 50 }, (_ , status) => {
          if (status === window.google.maps.StreetViewStatus.OK) {
            setIsAvailable(true);
          } else {
            setIsAvailable(false);
          }
        });
      }
      
    };

    loadGoogleMapsScript();
  }, [lat, lng]);

  return isAvailable;
};

export default StreetViewChecker;
