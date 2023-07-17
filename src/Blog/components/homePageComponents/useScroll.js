import { useEffect } from "react";
import { debounce } from "../../utils/helper";

/**
 * useScrollToLoadMore hook
 *
 * @param {Object} options - The options for the hook.
 * @param {boolean} options.isLoadingFilter - Whether the filter is currently loading.
 * @param {boolean} options.hasMore - Whether there are more items to load.
 * @param {function} options.setPage - The function to set the current page.
 */
// useScrollToLoadMore hook
const useScrollToLoadMore = ({ isLoadingFilter, hasMore, setPage }) => {
  useEffect(() => {
    const debouncedHandleScroll = debounce(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const bottomThreshold = 1000;
      if (
        !isLoadingFilter &&
        hasMore &&
        windowHeight + scrollTop >= documentHeight - bottomThreshold
      ) {
        console.log("Reached bottom of page");
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          console.log("Setting page to", nextPage);
          return nextPage;
        });
      }
    }, 200);

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
    // eslint-disable-next-line
  }, [isLoadingFilter, hasMore]);
};

export default useScrollToLoadMore;
