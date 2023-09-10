import SetupPage from "@/components/Setup";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

interface Props {}

const Setup: React.FC<Props> = () => {
  let router = useRouter();
  return <SetupPage></SetupPage>;
};

export default Setup;
