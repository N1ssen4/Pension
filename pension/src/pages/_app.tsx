import { type AppType } from "next/dist/shared/lib/utils";
import { UserContextProvider } from "../context";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default MyApp;
