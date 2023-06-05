import Layout from "../components/shared/Layout";
import { useAppContextState } from "../store/appContext";
import { useParams } from "react-router-dom";
import UpdatePasswordForm from "../components/resetPageComponents/UpdatePasswordForm";
import ForgotPasswordForm from "../components/resetPageComponents/ForgotPasswordForm";
import ResetPasswordForm from "../components/resetPageComponents/ResetPasswordForm";
import ConfirmationPage from "../components/resetPageComponents/ConfirmationPage";

const ResetPasswordPage = () => {
  const { isLoadingReset, userInfo, successMessage, errorReset } =
    useAppContextState();
  const { token } = useParams();

  if (userInfo && !token) {
    return (
      <Layout>
        <div className="vh-100 d-flex align-items-center justify-content-center pb-5">
          <UpdatePasswordForm
            {...{ isLoadingReset, successMessage, errorReset, userInfo }}
          />
        </div>
      </Layout>
    );
  }

  if (!userInfo && !token) {
    return (
      <Layout>
        <div className="vh-100 d-flex align-items-center justify-content-center pb-5">
          <ForgotPasswordForm
            {...{ isLoadingReset, successMessage, errorReset }}
          />
        </div>
      </Layout>
    );
  }

  if ((!userInfo || userInfo) && token) {
    return (
      <Layout>
        <div className="vh-100 d-flex align-items-center justify-content-center pb-5">
          <ResetPasswordForm
            {...{ isLoadingReset, successMessage, errorReset, token }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <ConfirmationPage
      heading="Whoops"
      paragraph="Something went wrong. Click on the link below to navigate back to the home page."
    />
  );
};

export default ResetPasswordPage;
