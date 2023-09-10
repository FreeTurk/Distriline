import ProductsPage from "@/components/Products";

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

const Products: React.FC<Props> = (props) => {
  return <ProductsPage></ProductsPage>;
};
export default Products;
