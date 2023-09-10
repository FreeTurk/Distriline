import LoginPage from "@/components/Login";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

interface Props {}

const Login: React.FC<Props> = () => {
  return <LoginPage></LoginPage>;
};

export default Login;
