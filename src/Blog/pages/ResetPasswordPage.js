import Layout from "../components/shared/Layout";
import { useAppContextState } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";
import UpdatePasswordForm from "../components/resetPageComponents/UpdatePasswordForm";
import ForgotPasswordForm from "../components/resetPageComponents/ForgotPasswordForm";
import ResetPasswordForm from "../components/resetPageComponents/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { isLoadingReset, userInfo, success, successMessage, errorReset } =
    useAppContextState();
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);

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

  if (!userInfo && token) {
    return (
      <Layout>
        <div className="vh-100 d-flex align-items-center justify-content-center pb-5">
          <ResetPasswordForm
            {...{ isLoadingReset, successMessage, errorReset, token, success }}
          />
        </div>
      </Layout>
    );
  }

  navigate("/");
  return null;
};

export default ResetPasswordPage;
