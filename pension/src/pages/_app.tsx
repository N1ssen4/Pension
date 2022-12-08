import { type AppType } from "next/dist/shared/lib/utils";
import { UserContextProvider } from "../context";

import "../styles/globals.css";
//My app wrapper where I initialize everything and setup the context provider. 
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default MyApp;
