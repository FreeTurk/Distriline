import { Table, Select, TextInput, Divider, Checkbox } from "@mantine/core";
import { Order, demo } from "@/lib/demodata";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "next-i18next";
interface Props {}

const Orders: React.FC<Props> = () => {
  const [elements, setElements] = useState<JSX.Element[]>([<></>]);
  const [tag, setTag] = useState<string>("");

  const [sort, setSort] = useState<string>("id");
  const [sortby, setSortby] = useState<string>("asc");

  const [checked, setChecked] = useState<Array<boolean>>(Array(demo.length).fill(false));
  const [isIndeterminate, setIsIndeterminate] = useState<boolean>(false);
  const [AllChecked, setAllChecked] = useState<boolean>(false);

  const { t, i18n } = useTranslation("common");

  let sortByData: Array<{ label: string; value: string }> = [
    { label: t("id"), value: "id" },
    { label: t("productname"), value: "name" },
    { label: t("price"), value: "price" },
    { label: t("quantity"), value: "quantity" },
    { label: t("customername"), value: "customer" },
    { label: t("address"), value: "address" },
    { label: t("phone"), value: "phone" },
    { label: t("email"), value: "email" },
    { label: t("paymentmethod"), value: "payment" },
    { label: t("deliverymethod"), value: "delivery" },
    { label: t("trackingnumber"), value: "tracking" },
  ];

  useEffect(() => {
    setIsIndeterminate(checked.includes(true) && checked.includes(false) && checked.length > 0);
    console.log(checked);
    setAllChecked(checked.every((item) => item === true));
  }, [checked, setChecked]);

  useEffect(() => {
    const sorter = (a: Order, b: Order) => {
      if (sortby == "asc") {
        if (a[sort] > b[sort]) {
          return 1;
        }
        if (a[sort] < b[sort]) {
          return -1;
        }
        return 0;
      } else {
        if (a[sort] < b[sort]) {
          return 1;
        }
        if (a[sort] > b[sort]) {
          return -1;
        }
        return 0;
      }
    };
    setElements(
      demo.sort(sorter).map((item) => {
        return (
          <tr key={item.id}>
            <th>
              <Checkbox
                checked={checked[item.id - 1]}
                onChange={(e) => {
                  let temp = checked;
                  temp[item.id - 1] = e.currentTarget.checked;
                  setChecked(temp);
                  console.log(checked);
                }}></Checkbox>
            </th>
            <th>{item.id}</th>
            <th>{item.name}</th>
            <th>{item.price}</th>
            <th>{item.quantity}</th>
            <th>{item.status}</th>
            <th>{item.date}</th>
            <th>{item.customer}</th>
            <th>{item.address}</th>
            <th>{item.phone}</th>
            <th>{item.email}</th>
            <th>{item.payment}</th>
            <th>{item.delivery}</th>
            <th>{item.tracking}</th>
          </tr>
        );
      })
    );
  }, [sort, sortby, setChecked, checked]);

  return (
    <div className="h-full w-full flex flex-col grow p-8 gap-4 box-border overflow-clip">
      <div className="flex flex-wrap flex-row h-fit gap-4 items-start">
        <Select
          radius={"xl"}
          description={t("sort")}
          placeholder={t("selectanoption")}
          value={sort}
          onChange={setSort}
          data={sortByData}></Select>
        <Select
          radius={"xl"}
          description={t("sortby")}
          placeholder={t("selectanoption")}
          value={sortby}
          onChange={setSortby}
          data={[
            { label: t("ascending"), value: "asc" },
            { label: t("descending"), value: "desc" },
          ]}></Select>
        <Divider orientation="vertical" className="overflow-hidden"></Divider>
        <Select
          radius={"xl"}
          value={tag}
          onChange={(e) => {
            setTag(e.currentTarget.value);
            console.log(tag);
          }}
          description={t("filterstatus")}
          placeholder={t("pickatag")}
          data={[
            { label: t("pending"), value: "pending" },
            { label: t("confirmed"), value: "confirmed" },
            { label: t("processing"), value: "processing" },
            { label: t("beingdelivered"), value: "beingdelivered" },
            { label: t("delivered"), value: "delivered" },
            { label: t("cancelled"), value: "cancelled" },
            { label: t("returned"), value: "returned" },
            { label: t("refunded"), value: "refunded" },
            { label: t("deliverypostponed"), value: "deliverypostponed" },
          ]}></Select>
        <Divider orientation="vertical" className=""></Divider>
        <TextInput radius={"xl"} placeholder={t("typehere")} description={t("search")}></TextInput>
        <Select
          radius={"xl"}
          description={t("searchby")}
          placeholder={t("selectanoption")}
          data={sortByData}></Select>
      </div>

      <Divider className="w-full"></Divider>
      <div className="w-full h-full box-border overflow-scroll border border-gray-300 dark:border-gray-600 rounded-md">
        <Table
          verticalSpacing={"sm"}
          withColumnBorders
          striped
          highlightOnHover
          className="w-max h-fit overflow-scroll">
          <thead className="sticky top-0 z-10 dark:bg-black shadow-sm bg-white">
            <tr>
              <th>
                <Checkbox indeterminate={isIndeterminate}></Checkbox>
              </th>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th>status</th>
              <th>date</th>
              <th>customer</th>
              <th>address</th>
              <th>phone</th>
              <th>email</th>
              <th>payment</th>
              <th>delivery</th>
              <th>tracking</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
