import RegisterPage from "@/components/Register";
import { useRouter } from "next/router";

interface Props {
  setTheme: any;
  theme: "light" | "dark";
}

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

const Register: React.FC<Props> = () => {
  return <RegisterPage></RegisterPage>;
};

export default Register;
