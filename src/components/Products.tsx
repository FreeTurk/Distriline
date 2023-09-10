import { demoproducts } from "@/lib/demodata";
import { useTranslation } from "next-i18next";
import { IconCirclePlus } from "@tabler/icons-react";
import { Modal, TextInput, NativeSelect } from "@mantine/core";
import { useState } from "react";

interface Props {}

const ProductsPage: React.FC<Props> = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { t } = useTranslation("common");
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={t("addproduct")}
        centered>
        <TextInput label={t("productname")} />
        <div className="flex flex-row gap-2">
          <NativeSelect
            className="w-fit"
            label={t("unit")}
            data={[
              { label: t("kilogram"), value: "kg" },
              { label: t("gram"), value: "g" },
              { label: t("liter"), value: "l" },
              { label: t("milliliter"), value: "ml" },
              { label: t("piece"), value: "pc" },
              { label: t("pack"), value: "pk" },
              { label: t("box"), value: "bx" },
              { label: t("bottle"), value: "bt" },
              { label: t("can"), value: "cn" },
              { label: t("pound"), value: "lb" },
              { label: t("ounce"), value: "oz" },
              { label: t("gallon"), value: "gal" },
            ]}></NativeSelect>
          <TextInput className="w-full" label={t("productname")} />
        </div>
      </Modal>
      {demoproducts.length == 0 && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-xl font-semibold">{t("noproducts")}</p>
          <div
            onClick={() => setModalOpened(true)}
            className="flex flex-row gap-1 border dark:border-gray-300 border-gray-600 rounded-md py-2 px-4 cursor-pointer hover:scale-110 hover:font-medium transition-all">
            <IconCirclePlus />
            <p>{t("addproduct")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
