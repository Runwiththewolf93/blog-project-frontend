import { useAppContextState } from "../store/appContext";
import { useBlogContextState } from "../store/blogContext";
import { useCommentContextState } from "../store/commentContext";
import useProfilePage from "../hooks/useProfilePage";
import useRandomUsers from "../hooks/useRandomUsers";
import DesktopLayout from "../components/profilePageComponents/DesktopLayout";
import TabletLayout from "../components/profilePageComponents/TabletLayout";
import MobileLayout from "../components/profilePageComponents/MobileLayout";
import { useMediaQuery } from "react-responsive";

const ProfilePage = () => {
  const { userProfile } = useRandomUsers("male");
  const { userInfo } = useAppContextState();
  const { blogInfo } = useBlogContextState();
  const { isLoadingUserComment, userCommentInfo, errorUserComment } =
    useCommentContextState();
  useProfilePage();

  // Defining the media queries
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1200px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 577px) and (max-width: 1199px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });

  if (isDesktopOrLaptop) {
    return (
      <DesktopLayout
        {...{
          userProfile,
          userInfo,
          blogInfo,
          userCommentInfo,
          isLoadingUserComment,
          errorUserComment,
        }}
      />
    );
  }

  if (isTablet) {
    return (
      <TabletLayout
        {...{
          userProfile,
          userInfo,
          blogInfo,
          userCommentInfo,
          isLoadingUserComment,
          errorUserComment,
        }}
      />
    );
  }

  if (isMobile) {
    return (
      <MobileLayout
        {...{
          userProfile,
          userInfo,
          blogInfo,
          userCommentInfo,
          isLoadingUserComment,
          errorUserComment,
        }}
      />
    );
  }
};

export default ProfilePage;
