import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'PensionDreamplan',
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 20000,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
