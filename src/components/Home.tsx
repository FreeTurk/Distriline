import { SegmentedControl, RingProgress, Divider } from "@mantine/core";
import { useTranslation } from "next-i18next";

import { useState, Dispatch, SetStateAction } from "react";

interface Props {}

interface BoxProps {
  child: JSX.Element;
  title: string;
  setter: Dispatch<SetStateAction<string>>;
  getter: string;
}

const Box: React.FC<BoxProps> = (props) => {
  const { t } = useTranslation("common");
  let currentMonth = month[new Date().getMonth()];
  let lastMonth = month[new Date().getMonth() - 1];
  let pages: {
    label: string;
    value: string;
  }[] = [
    { label: t("today"), value: "1" },
    { label: t("thismonth", { month: t(currentMonth) }), value: "2" },
    { label: t("lastmonth", { month: t(lastMonth) }), value: "3" },
    { label: t("ever"), value: "4" },
  ];
  return (
    <div className="max-h-[800px] min-w-[%33] max-w-[%75] grow border p-8 pb-8 flex flex-col gap-4 border-gray-300 dark:border-gray-600 rounded-md">
      <p className="text-3xl font-bold">{props.title}</p>
      <SegmentedControl
        className="shrink-0"
        value={props.getter}
        onChange={props.setter}
        radius={"md"}
        data={pages}
      />
      <div className="flex flex-col gap-4 overflow-y-scroll">{props.child}</div>
    </div>
  );
};

const month = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const HomePage: React.FC<Props> = () => {
  const [breakdown, setBreakdown] = useState<string>("1");
  const [statistics, setStatistics] = useState<string>("1");

  let currentMonth = month[new Date().getMonth()];
  let lastMonth = month[new Date().getMonth() - 1];

  const { t, i18n } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col p-8 sticky w-full max-w-[%75]">
        <div className="w-full text-4xl font-bold">{t("greet", { name: "Emir" })}</div>
        <div className="w-full text-2xl font-semibold">{`${t("company")}: Alpha Corp.`}</div>
      </div>
      <div className="w-full">
        <Divider />
      </div>
      <div className="w-full max-w-screen-2xl h-fit flex flex-row gap-8 grow-0 p-8 flex-wrap overflow-y-scroll justify-center items-stretch">
        {/* The box for Breakdown */}
        <Box
          setter={setStatistics}
          getter={statistics}
          title={t("statistics")}
          child={
            <>
              <div>
                <p className="text-xl font-semibold">
                  {statistics === "1" && t("today")}
                  {statistics === "2" && t("thismonth", { month: t(currentMonth) })}
                  {statistics === "3" && t("lastmonth", { month: t(lastMonth) })}
                  {statistics === "4" && t("ever")}
                </p>
                <div className="flex justify-center">
                  <RingProgress
                    roundCaps
                    thickness={32}
                    size={420}
                    label={
                      <p className="text-center font-semibold">
                        {t("grossprofit", { amount: 12000, currency: "$" })}
                        <br />
                        {t("targetgrossprofit", { amount: 15000, currency: "$" })}
                      </p>
                    }
                    sections={[
                      {
                        value: (10000 * 100) / 15000,
                        color: "blue",
                        tooltip: `${t("netprofit", { amount: 10000, currency: "$" })}`,
                      },
                      {
                        value: (500 * 100) / 15000,
                        color: "yellow",
                        tooltip: `${t("wageexpenses", { amount: 500, currency: "$" })}`,
                      },
                      {
                        value: (1500 * 100) / 15000,
                        color: "red",
                        tooltip: `${t("businessexpenses", { amount: 1500, currency: "$" })}`,
                      },
                    ]}
                  />
                </div>
              </div>
            </>
          }
        />
        {/* The box for Statistics */}
        <Box
          setter={setBreakdown}
          getter={breakdown}
          title={t("breakdown")}
          child={
            <>
              <div>
                <p className="text-xl font-semibold">
                  {breakdown === "1" && t("today")}
                  {breakdown === "2" && t("thismonth", { month: t(currentMonth) })}
                  {breakdown === "3" && t("lastmonth", { month: t(lastMonth) })}
                  {breakdown === "4" && t("ever")}
                </p>
                <p>{t("ordersdelivered", { count: 211 })}</p>
                <p>{t("grossprofitmade", { count: 12000, currency: "$" })}</p>
                <p>{t("netprofitmade", { count: 10000, currency: "$" })}</p>
              </div>
            </>
          }
        />
        <Box
          title={t("statistics")}
          child={
            <div className="flex flex-col gap-4">
              <div>{t("ordersdelivered", { count: 211 })}</div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default HomePage;
