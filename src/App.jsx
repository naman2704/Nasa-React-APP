import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error";
import { useState, useEffect } from "react";

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function getDataKey() {
    let currentDateStr = new Date().toDateString();
    return `NASA-STORAGE-KEY_${currentDateStr}`;
  }
  function cacheData(data_) {
    if (!data_ || Object.keys(data_).length === 0) return;
    let cachedDataKey = getDataKey();
    localStorage.setItem(cachedDataKey, JSON.stringify(data));
  }
  function clearCache() {
    localStorage.clear();
  }
  function hasCachedData() {
    let cachedDataKey = getDataKey();
    return Boolean(localStorage.getItem(cachedDataKey, JSON.stringify(data)));
  }
  function getCachedData() {
    let cachedDataKey = getDataKey();
    return JSON.parse(
      localStorage.getItem(cachedDataKey, JSON.stringify(data))
    );
  }

  async function fetchAPIData() {
    setLoading(true);
    /* fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`) */
    if (hasCachedData()) {
      setData(getCachedData());
      setLoading(false);
    } else {
      try {
        clearCache();
        const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
        let nasaAPIData = await fetch(API_URL);
        let nasaAPIData_ = await nasaAPIData.json();
        setData(nasaAPIData_);
        cacheData(nasaAPIData_);
        setLoading(false);
      } catch (err) {
        if (!err) {
          setError("Route not found");
        } else {
          if (err.error) {
            setError(err.error);
          } else {
            setError("Internal server error!");
          }
        }
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    /* clearCache(); */
    fetchAPIData();
  }, []);
  let { date, explanation, hdurl, media_type, service_version, title, url } =
    data;
  return (
    <>
      {error !== null && (
        <Error>
          <p className="m-0">{error}</p>
        </Error>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Main imageURL={hdurl} imageALT={title} />
          <SideBar title={title} date={date} description={explanation} />
          <Footer title={title} date={date} />
          <button
            onClick={() => {
              clearCache();
              fetchAPIData();
            }}
            className="refresh-btn"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </button>
        </>
      )}
    </>
  );
}

export default App;
