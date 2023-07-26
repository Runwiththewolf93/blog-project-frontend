import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Fetches Unsplash images based on the provided query.
 *
 * @param {string} query - The search query for the images.
 * @param {number} numOfPhotos - The number of photos to fetch.
 * @param {function} setIsLoadingImages - A function to set the loading state of the images.
 * @param {function} setErrorImages - A function to set the error state of the images.
 * @return {Array} The fetched images.
 */
const useUnsplashImages = (
  query,
  numOfPhotos,
  setIsLoadingImages,
  setErrorImages
) => {
  const [images, setImages] = useState([]);
  const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    if (!accessKey) {
      if (setErrorImages)
        setErrorImages("Access key is not provided or is invalid.");
      return;
    }

    if (setIsLoadingImages) setIsLoadingImages(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&per_page=${numOfPhotos}&query=${query}&client_id=${accessKey}`
      )
      .then(({ data }) => {
        if (data.results) {
          setImages(data.results);
        }
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
