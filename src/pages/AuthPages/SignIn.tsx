import PageMeta from "../../components/common/PageMeta";

import SignInForm from "../../components/auth/SignInForm";
import AppConfig from "../../utils/appConfig";

export default function SignIn() {
  return (
    <>
       <PageMeta
        title={AppConfig.appTitle}
        description={AppConfig.appDescription}
      />
      <SignInForm />
      {/* <AuthLayout>
       
      </AuthLayout> */}
    </>
  );
}
