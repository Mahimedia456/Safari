import {
  create,
} from "zustand";

import {
  dummyMerchantEarnings,
  dummyMerchantPayouts,
  dummyMerchantProfiles,
} from "../data/merchantPortal";

import type {
  MerchantEarningEntry,
  MerchantPayoutEntry,
  MerchantPortalProfile,
  MerchantPortalRole,
} from "../types/merchantPortal";

interface MerchantPortalState {
  profiles:
    MerchantPortalProfile[];

  earnings:
    MerchantEarningEntry[];

  payouts:
    MerchantPayoutEntry[];

  updateProfile: (
    role: MerchantPortalRole,
    changes:
      Partial<MerchantPortalProfile>,
  ) => void;
}

export const useMerchantPortalStore =
  create<MerchantPortalState>(
    (set) => ({
      profiles:
        dummyMerchantProfiles,

      earnings:
        dummyMerchantEarnings,

      payouts:
        dummyMerchantPayouts,

      updateProfile: (
        role,
        changes,
      ) => {
        set((state) => ({
          profiles:
            state.profiles.map(
              (profile) =>
                profile.role ===
                role
                  ? {
                      ...profile,
                      ...changes,
                      role,
                    }
                  : profile,
            ),
        }));
      },
    }),
  );