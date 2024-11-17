import { useEffect, useState } from "react";
import localSessionStorage from "./localSessionStorage";
import { StorageConstants } from "@/constants/StorageConstants";
// import { SignInModel } from "@/models/SignInModel";

// export const useCurrentUser = (): SignInModel | null => {
export const useCurrentUser = (): any | null => {
  const [currentUser, setCurrentUser] = useState(null);
  const { getItem } = localSessionStorage();
  useEffect(() => {
    if (currentUser) {
      return currentUser;
    }
    const storedUser = getItem(StorageConstants.CURRENT_USER_OBJECT);
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  return currentUser;
};
