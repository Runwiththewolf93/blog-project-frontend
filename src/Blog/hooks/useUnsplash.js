import { useState, useEffect } from "react";
import axios from "axios";

const useUnsplashImages = (query, numOfPhotos) => {
  const [images, setImages] = useState([]);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=${numOfPhotos}&query=${query}&client_id=${accessKey}`
      )
      .then(({ data }) => {
        setImages(data.results);
      });
  }, [accessKey, numOfPhotos, query]);

  return images;
};

export default useUnsplashImages;
