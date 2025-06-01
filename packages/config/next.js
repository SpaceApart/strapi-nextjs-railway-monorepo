const baseConfig = require("./eslint.js");

module.exports = {
  ...baseConfig,
  extends: [
    ...baseConfig.extends,
    "next/core-web-vitals",
  ],
  plugins: [
    ...baseConfig.plugins,
    "react",
    "react-hooks",
    "jsx-a11y",
  ],
  rules: {
    ...baseConfig.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};