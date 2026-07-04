import { useEffect, useMemo, useRef } from "react";
import { usePrivy, useWallets, type User } from "@privy-io/react-auth";
import { syncPrivyUser } from "@/lib/api";

function userFullName(user: User | null) {
  if (!user) return undefined;
  const profile = [user.google, user.linkedin, user.github, user.twitter].find(Boolean) as
    | { name?: string }
    | undefined;
  return profile?.name;
}

export function PrivyUserSync() {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const syncedKey = useRef("");

  const payload = useMemo(() => {
    if (!ready || !authenticated || !user) return null;
    return {
      email: user.email?.address,
      phone: user.phone?.number,
      fullName: userFullName(user),
      wallets: wallets.map((wallet) => ({
        address: wallet.address,
        chainType: "ethereum",
        walletType: wallet.walletClientType || "embedded",
      })),
    };
  }, [authenticated, ready, user, wallets]);

  useEffect(() => {
    if (!payload) return;
    const key = JSON.stringify(payload);
    if (syncedKey.current === key) return;
    syncedKey.current = key;
    syncPrivyUser(payload).catch((error) => {
      syncedKey.current = "";
      console.error("Failed to sync Privy user", error);
    });
  }, [payload]);

  return null;
}
