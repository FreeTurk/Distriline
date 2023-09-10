import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Text,
  Popover,
  Box,
  Progress,
  Notification,
} from "@mantine/core";
import { useState } from "react";
interface Props {}
import { IconX, IconCheck } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";

import { releaseNotification } from "@/lib/dispatchNotification";
//? Import statements end here

//? Password Requirements Setup
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm">
      {meets ? <IconCheck size="0.9rem" /> : <IconX size="0.9rem" />} <Box ml={10}>{label}</Box>
    </Text>
  );
}
//?

const RegisterPage: React.FC<Props> = (props) => {
  //? Router Setup for Localization
  const router = useRouter();
  router.locale = "";
  const { t, i18n } = useTranslation("common");

  //? More Password Requirements
  const requirements: Array<{
    re: RegExp;
    label: string;
  }> = [
    { re: /[0-9]/, label: t("passReq1") },
    { re: /[a-z]/, label: t("passReq2") },
    { re: /[A-Z]/, label: t("passReq3") },
  ];

  //? Password Strength Checker
  function getStrength(password: string) {
    correctMultiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        correctMultiplier = correctMultiplier + 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * correctMultiplier, 10);
  }

  //? State Management For All Inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  //? Every Correct Satisfied Requirement for the Password Adds 1 to this variable
  let correctMultiplier: number;

  const [popoverOpened, setPopoverOpened] = useState(false);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));
  const strength = getStrength(password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  //? Calls the API to register the user
  const reg = async () => {
    // Check email
    if (
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      releaseNotification("error", "Account Not Created", "Your email is wrong/empty!", false);
      return;
    }

    // Check Password Strength
    getStrength(password);

    if (correctMultiplier != 0) {
      releaseNotification(
        "error",
        "Account Not Created",
        "Your password is not strong enough!",
        false
      );
      return;
    }

    if (name == "") {
      releaseNotification("error", "Account Not Created", "Your name is not valid!", false);
      return;
    }

    if (password != repassword) {
      releaseNotification("error", "Account Not Created", "Your passwords do not match!", false);
      return;
    }

    //? Check if terms and conditions are agreed
    if (!agreed) {
      releaseNotification(
        "error",
        "Account Not Created",
        "You must agree to the terms and conditions!",
        false
      );
      return;
    }

    //? If all checks are passed, call the API
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        namesurname: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      console.log(res);
      if (res.status == 200) {
        releaseNotification("success", "Account Created", "Your account has been created!", true);
        router.push("/login");
      } else if (res.status == 400) {
        releaseNotification(
          "error",
          "Account Not Created",
          "Your email is already in use!",

          false
        );
      }
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-fit w-96 border p-8 flex flex-col gap-4 border-gray-300 dark:border-gray-600 rounded-md">
        {/* Title */}
        <p className="text-2xl font-bold">{t("register")}</p>
        {/* Email and Name/Surname */}
        <div className="w-full h-fit">
          <TextInput
            label={t("email")}
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}></TextInput>
          <TextInput
            label={t("namesurname")}
            withAsterisk
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}></TextInput>
        </div>

        {/* Password (Including the Strength Popover) */}
        <div className="w-full h-fit">
          <Popover
            opened={popoverOpened}
            position="left"
            width="target"
            transitionProps={{ transition: "pop" }}>
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}>
                <PasswordInput
                  label={t("password")}
                  withAsterisk
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}></PasswordInput>
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} />
              <PasswordRequirement label={t("passReq4")} meets={password.length > 7} />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            label={t("repeatPassword")}
            withAsterisk
            value={repassword}
            onChange={(e) => setRepassword(e.currentTarget.value)}></PasswordInput>
        </div>

        {/* Terms and Conditions */}
        <div>
          <Checkbox
            label={t("termsandconditions")}
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.currentTarget.checked);
            }}></Checkbox>
        </div>

        {/* Continue Button */}
        <div className="w-full">
          <Button fullWidth onClick={() => reg()}>
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
