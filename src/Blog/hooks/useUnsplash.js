import { useState, useEffect } from "react";
import axios from "axios";

const useUnsplashImages = (
  query,
  numOfPhotos,
  setIsLoadingImages,
  setErrorImages
) => {
  const [images, setImages] = useState([]);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    if (setIsLoadingImages) setIsLoadingImages(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=${numOfPhotos}&query=${query}&client_id=${accessKey}`
      )
      .then(({ data }) => {
        setImages(data.results);
      })
      .catch(error => {
        if (setErrorImages) setErrorImages(error.message);
      })
      .finally(() => {
        if (setIsLoadingImages) setIsLoadingImages(false);
      });
  }, [accessKey, numOfPhotos, query, setIsLoadingImages, setErrorImages]);

  return images;
};

export default useUnsplashImages;
