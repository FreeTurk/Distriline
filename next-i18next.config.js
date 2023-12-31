module.exports = {
  debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "default",
    locales: ["default", "en", "de", "tr", "sv"],
    localeDetection: true,
    reloadOnPrerender: process.env.NODE_ENV === "development",
  },
};
