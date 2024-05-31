import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const getUserId = (): string => {
  let userId = Cookies.get("user_id");
  if (!userId) {
    userId = uuidv4();
    Cookies.set("user_id", userId as string, { expires: 365 });
  }
  return userId as string; 
};
