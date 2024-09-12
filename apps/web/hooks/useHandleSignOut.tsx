import { signOut } from "next-auth/react";
import { store } from "../store/store";
import { logout } from "../pages/api/auth/[...nextauth]";
import useClearTrialLocks from "../hooks/useClearTrialLocks";
import { useRouter } from "next/router";
import process from "process";

/*
 * react hook to handle everything with sign out
 */
const useHandleSignOut = () => {
  const { clearTrialLocksOperation } = useClearTrialLocks();
  const router = useRouter();

  const handleSignOut = async () => {
    await clearTrialLocksOperation();
    signOut({ callbackUrl: '/#/login', redirect: false }).then(() => {
      store.dispatch(logout());
      router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
    });
  };

  return { handleSignOut };
};

export default useHandleSignOut;
