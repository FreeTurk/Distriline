import Orders from "@/components/Orders";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
interface Props {
  setTheme: any;
  theme: "light" | "dark";
}

const Main: React.FC<Props> = (props) => {
  return <Orders></Orders>;
};

export default Main;
