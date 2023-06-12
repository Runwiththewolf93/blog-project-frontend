import { useEffect } from "react";
import { debounce } from "../../utils/helper";

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
