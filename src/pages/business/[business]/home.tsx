
import HomePage from "@/components/Home";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

interface Props {}

const Home: React.FC<Props> = () => {
  return <HomePage />;
};

export default Home;
