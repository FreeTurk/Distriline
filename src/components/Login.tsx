import { useState } from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { releaseNotification } from "@/lib/dispatchNotification";
import { useRouter } from "next/router";
import { userData } from "@/lib/states";

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation("common");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const setUserData = userData((state) => state.setData);
  const _userData = userData((state) => state.data);

  const router = useRouter();

  const login = () => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    }).then(async (res) => {
      if (res.status == 200) {
        releaseNotification(
          "success",
          "Login Successful",
          "You have been logged in successfully.",
          true
        );
        let json = await res.json();
        setUserData(json);
        router.push("/business/alpha/orders");
      } else if (res.status == 400)
        releaseNotification("error", "Login Failed", "This account does not exist.", false);
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-fit w-96 border p-8 flex flex-col gap-4 border-gray-300 dark:border-gray-600 rounded-md">
        <p className="text-2xl font-bold">{t("login")}</p>
        <div className="w-full h-fit">
          <TextInput
            label={t("email")}
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}></TextInput>
        </div>
        <div className="w-full h-fit">
          <PasswordInput
            label={t("password")}
            withAsterisk
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}></PasswordInput>
        </div>
        <div className="w-full">
          <Button fullWidth onClick={() => login()}>
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
