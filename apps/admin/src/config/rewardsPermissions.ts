import type { AccountRole } from "../types/auth";

export interface RewardsPermissions {
  view: boolean;
  editRules: boolean;
  editRedemption: boolean;
  editReferral: boolean;
  manageCampaigns: boolean;
  adjustPoints: boolean;
}

export function getRewardsPermissions(
  role: AccountRole,
): RewardsPermissions {
  switch (role) {
    case "super_admin":
    case "admin":
      return {
        view: true,
        editRules: true,
        editRedemption: true,
        editReferral: true,
        manageCampaigns: true,
        adjustPoints: true,
      };

    case "finance_manager":
      return {
        view: true,
        editRules: false,
        editRedemption: true,
        editReferral: false,
        manageCampaigns: false,
        adjustPoints: true,
      };

    case "operations_manager":
      return {
        view: true,
        editRules: false,
        editRedemption: false,
        editReferral: false,
        manageCampaigns: true,
        adjustPoints: false,
      };

    case "support":
      return {
        view: true,
        editRules: false,
        editRedemption: false,
        editReferral: false,
        manageCampaigns: false,
        adjustPoints: false,
      };

    default:
      return {
        view: false,
        editRules: false,
        editRedemption: false,
        editReferral: false,
        manageCampaigns: false,
        adjustPoints: false,
      };
  }
}