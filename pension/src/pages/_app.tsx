import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "../context/UserContext";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [contextUser, setContextUser] = useState(null);
  const value = useMemo(
    () => ({ contextUser, setContextUser }),
    [contextUser, setContextUser]
  );
  
    useEffect(() => {
      const user = localStorage.getItem("User");

      if (user) {
        setContextUser(JSON.parse(user));
      }
    }, []);
  return (
    <UserContext.Provider value={value}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};

export default MyApp;
