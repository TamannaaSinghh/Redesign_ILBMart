"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import Script from "next/script";
import logo from "../../../public/assets/images/location_logo.png";
import "./LocationPopup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Location {
  address: string;
  coordinates: GeolocationCoordinates | null;
  pincode?: string;
  deliveryTime?: string;
}

interface Suggestion {
  mainText: string;
  secondaryText: string;
  placeId: string;
  types: string[];
}

interface LocationContextType {
  location: Location | null;
  detectLocation: () => void;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  saveLocation: (loc: Location) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Array<
    | Suggestion
    | { loading: true; text: string }
    | { noResults: true; text: string }
  >;
  isDetecting: boolean;
  handleSuggestionClick: (placeId: string) => void;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPincode: string;
  setSelectedPincode: React.Dispatch<React.SetStateAction<string>>;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<
      | Suggestion
      | { loading: true; text: string }
      | { noResults: true; text: string }
    >
  >([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState<any>(null);
  const [placesService, setPlacesService] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState("");

  const initGoogleServices = useCallback(() => {
    if (typeof window !== "undefined" && window.google) {
      setAutocompleteService(
        new window.google.maps.places.AutocompleteService()
      );
      setPlacesService(
        new window.google.maps.places.PlacesService(
          document.createElement("div")
        )
      );
      setGeocoder(new window.google.maps.Geocoder());
    }
  }, []);

  useEffect(() => {
    const savedLocation = localStorage.getItem("ilb-mart-location");
    if (savedLocation) {
      const parsedLocation = JSON.parse(savedLocation);
      setLocation(parsedLocation);
      if (parsedLocation.pincode) {
        setSelectedPincode(parsedLocation.pincode);
      }
    } else {
      setShowPopup(true);
    }

    if (!window.google?.maps) {
      return;
    }
    initGoogleServices();
  }, [initGoogleServices]);

  const saveLocation = useCallback((loc: Location) => {
    const locationData = {
      address: loc.address,
      coordinates: loc.coordinates,
      pincode: loc.pincode || "",
    };

    setLocation(locationData);
    localStorage.setItem("ilb-mart-location", JSON.stringify(locationData));
    setShowPopup(false);
    setSearchQuery("");
    setSuggestions([]);
    if (loc.pincode) {
      setSelectedPincode(loc.pincode);
    }
  }, []);

  const detectLocation = useCallback(() => {
    setIsDetecting(true);

    if (!navigator.geolocation) {
      setShowPopup(true);
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!geocoder) {
          setIsDetecting(false);
          return;
        }

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        geocoder.geocode(
          { location: { lat, lng } },
          (results: any, status: string) => {
            setIsDetecting(false);
            if (status === "OK" && results?.[0]) {
              const address = results[0].formatted_address;
              const pincode = results[0].address_components?.find((c: any) =>
                c.types.includes("postal_code")
              )?.long_name;

              saveLocation({
                address,
                pincode: pincode || "N/A",
                coordinates: position.coords,
              });
            } else {
              saveLocation({
                address: "Detected Location",
                coordinates: position.coords,
                pincode: "N/A",
              });
            }
          }
        );
      },
      (error) => {
        setIsDetecting(false);
        handleGeolocationError(error);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [geocoder, saveLocation]);

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!placesService) return;

      placesService.getDetails(
        { placeId, fields: ["formatted_address", "address_components"] },
        (place: any, status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const pincode = place.address_components?.find((c: any) =>
              c.types.includes("postal_code")
            )?.long_name;

            saveLocation({
              address: place.formatted_address,
              coordinates: null,
              pincode: pincode || "N/A",
            });
          } else {
            showAlert("Could not get address details.");
          }
        }
      );
    },
    [placesService, saveLocation]
  );

  useEffect(() => {
    if (!autocompleteService || searchQuery.length < 3) {
      setSuggestions(
        searchQuery.length === 0
          ? []
          : [{ loading: true, text: "Type more..." }]
      );
      return;
    }

    setSuggestions([{ loading: true, text: "Searching..." }]);

    autocompleteService.getPlacePredictions(
      {
        input: searchQuery,
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      },
      (predictions: any, status: string) => {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          setSuggestions([{ noResults: true, text: "No results" }]);
          return;
        }

        setSuggestions(
          predictions.map((p: any) => ({
            mainText: p.structured_formatting.main_text,
            secondaryText: p.structured_formatting.secondary_text || "",
            placeId: p.place_id,
            types: p.types,
          }))
        );
      }
    );
  }, [searchQuery, autocompleteService]);

  const handleGeolocationError = useCallback(
    (error: GeolocationPositionError) => {
      let message = "Could not detect your location.";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = "Location access was denied.";
          break;
        case error.POSITION_UNAVAILABLE:
          message = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          message = "Request to get your location timed out.";
          break;
      }
      showAlert(message);
    },
    []
  );

  const showAlert = useCallback((message: string) => {
    const alertDiv = document.createElement("div");
    alertDiv.className = "location-alert";
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.style.opacity = "0";
      alertDiv.addEventListener("transitionend", () => alertDiv.remove());
    }, 3000);
  }, []);

  const getIconForType = useCallback((types: string[] = []) => {
    if (types.includes("street_address") || types.includes("premise"))
      return <i className="fas fa-location-dot"></i>;
    if (types.includes("route")) return <i className="fas fa-route"></i>;
    if (types.includes("locality")) return <i className="fas fa-city"></i>;
    if (types.includes("sublocality"))
      return <i className="fas fa-signs-post"></i>;
    if (types.includes("country"))
      return <i className="fas fa-globe-americas"></i>;
    if (types.includes("postal_code"))
      return <i className="fas fa-envelopes-bulk"></i>;
    if (types.includes("establishment")) return <i className="fas fa-shop"></i>;
    if (types.includes("point_of_interest"))
      return <i className="fas fa-landmark"></i>;
    return <i className="fas fa-map-marker-alt"></i>;
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyABSvWt3ks7APzEFLcSxdgNEvbMYosG7QU&libraries=places`}
        strategy="lazyOnload"
        onLoad={initGoogleServices}
      />
      <style jsx global>{`
        .pac-container {
          display: none !important;
        }
      `}</style>
      <LocationContext.Provider
        value={{
          location,
          detectLocation,
          setShowPopup,
          saveLocation,
          searchQuery,
          setSearchQuery,
          suggestions,
          isDetecting,
          handleSuggestionClick,
          showSearch,
          setShowSearch,
          selectedPincode,
          setSelectedPincode,
        }}
      >
        {children}
        {showPopup && <LocationPopup getIconForType={getIconForType} />}
      </LocationContext.Provider>
    </>
  );
};

interface LocationPopupProps {
  getIconForType: (types: string[]) => React.ReactNode;
}

const LocationPopup: React.FC<LocationPopupProps> = ({ getIconForType }) => {
  const {
    detectLocation,
    saveLocation,
    searchQuery,
    setSearchQuery,
    suggestions,
    isDetecting,
    handleSuggestionClick,
    showSearch,
    setShowSearch,
    selectedPincode,
    setShowPopup,
  } = useLocation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }

      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSearch, setShowPopup]);

  return (
    <div className="location-popup-overlay">
      <div className="location-popup-modal" ref={popupRef}>
        <h2 className="location-popup-title">
          Welcome to{" "}
          <span className="popup-logo">
            <Image src={logo} alt="ILB MART" width={100} height={40} priority />
          </span>
        </h2>
        <p>Your Local Bazaar is now Online</p>
        <div className="location-selector">
          <div className="location-dropdown" ref={dropdownRef}>
            <div className="location-dropdown-menu">
              <div className="option-row">
                <div
                  className="location-option detect-location"
                  onClick={detectLocation}
                >
                  <i className="fas fa-location-crosshairs"></i>
                  <span>
                    {isDetecting ? "Detecting..." : "Detect My Location"}
                  </span>
                  {isDetecting && <span className="spinner-border"></span>}
                </div>

                <div className="or-separator">- or -</div>

                <div
                  className="location-option enter-manually"
                  onClick={() => setShowSearch(true)}
                >
                  <i className="fas fa-keyboard"></i>
                  <span>Enter Address Manually</span>
                </div>
              </div>

              {showSearch && (
                <div className="search-container">
                  <div className="relative">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                      type="text"
                      className="address-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for an address..."
                    />
                  </div>
                  <div className="address-suggestions">
                    {suggestions.map((suggestion, index) =>
                      "loading" in suggestion ? (
                        <div key={index} className="loading-suggestion">
                          <i
                            className={`fas ${
                              "noResults" in suggestion
                                ? "fa-map-marked-alt"
                                : "fa-spinner fa-spin"
                            }`}
                          ></i>
                          {suggestion.text}
                        </div>
                      ) : "placeId" in suggestion ? (
                        <div
                          key={index}
                          className="suggestion-item flex gap-1.5"
                          onClick={() =>
                            handleSuggestionClick(suggestion.placeId)
                          }
                        >
                          <div className="suggestion-icon">
                            {getIconForType(suggestion.types)}
                          </div>
                          <div className="suggestion-text">
                            <div className="suggestion-main-text text-left">
                              {suggestion.mainText}
                            </div>
                            {suggestion.secondaryText && (
                              <div className="suggestion-secondary-text text-left">
                                {suggestion.secondaryText}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {selectedPincode && selectedPincode !== "N/A" && (
                <div className="pincode-display">
                  <h6>Your Selected Pincode</h6>
                  <div className="pincode-text">{selectedPincode}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
