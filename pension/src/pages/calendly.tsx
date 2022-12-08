import { useContext } from "react";
import { InlineWidget } from "react-calendly";
import { UserContext } from "../context";


//Calendly page for when a user has been through the app and wants to book a meeting.
const calendly = () => {
  const { user } = useContext(UserContext);
  return <InlineWidget 
  url="https://calendly.com/dreamplan/intromode"
  prefill={{
    customAnswers: {
        a1: JSON.stringify(user,null,4)
    }
  }}
   />;
};

export default calendly;
