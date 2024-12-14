import { createContext, useState, useEffect, useContext } from "react";
import data from "../../data/cities.json";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Load Data
  useEffect(function () {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setCities(data.cities);
      setIsLoading(false);
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timer);
  }, []); // Load on Mount

  function getCity(id) {
    const foundCity = cities.find((city) => city.id === Number(id));
    setCurrentCity(foundCity);
  }

  async function getCityWithDelay(id) {
    setIsLoading(true);

    await delay(300); // Simulate 0.3 second delay
    const city = getCity(id); // Call synchronous getCity function
    setIsLoading(false);

    return city;
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, getCityWithDelay }}>
      {children}
    </CitiesContext.Provider>
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };

// useEffect(function () {
//   async function fetchCities() {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`${BASE_URL}/cities`);
//       const data = await res.json();
//       setCities(data);
//     } catch (error) {
//       alert("Error loading Cities data");
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   fetchCities();
// }, []); // Load on Mount

// async function getCity(id) {
//   try {
//     setIsLoading(true);
//     const res = await fetch(`${BASE_URL}/cities/${id}`);
//     const data = await res.json();
//     setCurrentCity(data);
//   } catch (error) {
//     alert("Error loading City data");
//   } finally {
//     setIsLoading(false);
//   }
// }
