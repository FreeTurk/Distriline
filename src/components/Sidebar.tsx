import { useEffect, useState } from "react";
import { Navbar, NavLink, Menu, Divider } from "@mantine/core";
import { useRouter } from "next/router";
import {
  IconHome,
  IconChevronRight,
  IconChevronLeft,
  IconPackageImport,
  IconArchive,
  IconWorld,
  IconSunMoon,
  IconUsersPlus,
  IconLogin,
  IconExternalLink,
  IconBuildingFactory2,
  IconShoppingCart,
  IconSettings,
  IconLogout,
  IconApple,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { userData } from "@/lib/states";
import useStore from "@/lib/useStore";
import { releaseNotification } from "@/lib/dispatchNotification";

interface Props {
  setLocale: any;
  setTheme: any;
  theme: "light" | "dark";
}

const Sidebar: React.FC<Props> = (props) => {
  const user = useStore(userData, (state) => state.data);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const logoutUser = userData((state) => state.logOut);
  console.log(user);
  const router = useRouter();

  const logout = () => {
    if (logoutUser) {
      logoutUser();
      releaseNotification("success", "Logout Successful", "You have been logged out.", true);
      router.push("/login");
    }
  };

  useEffect(() => {
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? props.setTheme("dark")
      : props.setTheme("light");
  }, []);
  const { t, i18n } = useTranslation("common");

  return (
    <div className="h-full w-fit">
      {collapsed && (
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex cursor-pointer items-center justify-end p-0.5 z-50 w-12 h-12 rounded-full absolute top-4 -left-6 backdrop-blur-md select-none shadow-md border border-gray-300 dark:border-gray-600">
          <IconChevronRight />
        </div>
      )}
      <Navbar
        className={`flex flex-col justify-between select-none gap-4 ${
          collapsed ? "w-0 overflow-hidden" : "w-60 p-4 border-r"
        } h-full shrink-0 grow-0 border-gray-300 dark:border-gray-600 rounded-md transition-all`}>
        <Navbar.Section className="flex flex-col gap-2 grow">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => setCollapsed(!collapsed)}>
            <IconChevronLeft size={"2rem"} color="#828382"></IconChevronLeft>
            <p className="mx-3 my-2 text-2xl flex">
              Distriline <span className="text-sm text-gray-300 dark:text-gray-600">vA1</span>
            </p>
          </div>
          {user?.type == "employee" && (
            <div className="flex flex-col">
              <NavLink
                label={t("home")}
                icon={<IconHome size={"1.5rem"} color={"#68f"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
                onClick={() => router.push("/business/alpha/home")}
                active={router.pathname === "/business/[business]/home"}
              />
              <NavLink
                label={t("products")}
                icon={<IconApple size={"1.5rem"} color={"#b0e"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
                onClick={() => router.push("/business/alpha/products")}
                active={router.pathname === "/business/[business]/products"}
              />
              <NavLink
                label={t("orders")}
                icon={<IconPackageImport size={"1.5rem"} color={"#3c6"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
                onClick={() => router.push("/business/alpha/orders")}
                active={router.pathname === "/business/[business]/orders"}
              />
              <NavLink
                label={t("archive")}
                icon={<IconArchive size={"1.5rem"} color={"#f86"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
              />
            </div>
          )}
          {user?.type == "user" && (
            <div className="flex flex-col">
              <NavLink
                label={t("home")}
                icon={<IconHome size={"1.5rem"} color={"#68f"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
                onClick={() => router.push("/business/alpha/home")}
                active={router.pathname === "/business/[business]/home"}
              />
              <NavLink
                label={t("companies")}
                icon={<IconBuildingFactory2 size={"1.5rem"} color={"#3c6"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
                onClick={() => router.push("/business/alpha/orders")}
                active={router.pathname === "/business/[business]/orders"}
              />
              <NavLink
                label={t("shoppingcart")}
                icon={<IconShoppingCart size={"1.5rem"} color={"#f86"} />}
                rightSection={<IconChevronRight size={"1rem"} color="#828382" />}
              />
            </div>
          )}
        </Navbar.Section>
        {user == null ? (
          <Navbar.Section className="flex flex-col">
            <p className="px-3 py-2 text-2xl">{t("account")}</p>{" "}
            <div className="flex flex-col w-full justify-between">
              <NavLink
                label={t("register")}
                icon={<IconUsersPlus color={"#9bf"} />}
                rightSection={<IconExternalLink size={"1rem"} color="#828382" />}
                onClick={() => router.push("/register")}
              />
              <NavLink
                label={t("login")}
                icon={<IconLogin color={"#9bf"} />}
                rightSection={<IconExternalLink size={"1rem"} color="#828382" />}
                onClick={() => router.push("/login")}
              />
            </div>
          </Navbar.Section>
        ) : (
          <Navbar.Section className="flex flex-col">
            <p className="px-3 text-2xl">{user.result.name}</p>{" "}
            <p className="px-3 pb-2 text-md text-gray-600">
              {user.type == "user" && "Customer"}
              {user.type == "employee" && "Employee"}
            </p>
            <div className="flex flex-col w-full justify-between">
              <NavLink
                label={t("settings")}
                icon={<IconSettings color={"#9bf"} />}
                rightSection={<IconExternalLink size={"1rem"} color="#828382" />}
                onClick={() => {}}
              />
              <NavLink
                label={t("logout")}
                icon={<IconLogout color={"#9bf"} />}
                rightSection={<IconExternalLink size={"1rem"} color="#828382" />}
                onClick={() => logout()}
              />
            </div>
          </Navbar.Section>
        )}
        <Divider my="sm" />
        <Navbar.Section className="flex flex-col w-full">
          <div className="flex flex-col justify-between">
            <Menu>
              <Menu.Target>
                <NavLink label={t("language")} icon={<IconWorld color={"#9bf"} />}></NavLink>
              </Menu.Target>
              <Menu.Dropdown className="emoji">
                <Menu.Item
                  onClick={() => {
                    router.push(router.asPath, router.asPath, { locale: "en" });
                    props.setLocale("en");
                  }}>
                  🇬🇧 English
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    router.push(router.asPath, router.asPath, { locale: "sv" });
                    props.setLocale("sv");
                  }}>
                  🇸🇪 Swedish
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    router.push(router.asPath, router.asPath, { locale: "tr" });
                    props.setLocale("tr");
                  }}>
                  🇹🇷 Turkish
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    router.push(router.asPath, router.asPath, { locale: "de" });
                    props.setLocale("de");
                  }}>
                  🇩🇪 German
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <NavLink
              label={t("theme")}
              icon={<IconSunMoon size={"1.5rem"} color={"#3c6"} />}
              onClick={() => props.setTheme(props.theme == "dark" ? "light" : "dark")}
            />
          </div>
        </Navbar.Section>
      </Navbar>
    </div>
  );
};

export default Sidebar;
