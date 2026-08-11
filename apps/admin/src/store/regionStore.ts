import {
  create,
} from "zustand";

import {
  dummyRegions,
} from "../data/regions";

import type {
  RegionLocalization,
  RegionOperations,
  RegionRideType,
  RegionServiceType,
  RegionStatus,
  RegionSupport,
  SafariRegion,
} from "../types/region";

interface RegionState {
  regions: SafariRegion[];

  setRegionStatus: (
    regionId: string,
    status: RegionStatus,
  ) => void;

  toggleService: (
    regionId: string,
    service: RegionServiceType,
  ) => void;

  toggleServiceMerchantRegistration: (
    regionId: string,
    service: RegionServiceType,
  ) => void;

  toggleRideType: (
    regionId: string,
    rideType: RegionRideType,
  ) => void;

  toggleRideDriverRegistration: (
    regionId: string,
    rideType: RegionRideType,
  ) => void;

  updateLocalization: (
    regionId: string,
    changes:
      Partial<RegionLocalization>,
  ) => void;

  updateSupport: (
    regionId: string,
    changes:
      Partial<RegionSupport>,
  ) => void;

  updateOperations: (
    regionId: string,
    changes:
      Partial<RegionOperations>,
  ) => void;
}

export const useRegionStore =
  create<RegionState>(
    (set) => ({
      regions: dummyRegions,

      setRegionStatus: (
        regionId,
        status,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      status,

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      toggleService: (
        regionId,
        service,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      services:
                        region.services.map(
                          (item) =>
                            item.service ===
                            service
                              ? {
                                  ...item,

                                  enabled:
                                    !item.enabled,
                                }
                              : item,
                        ),

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      toggleServiceMerchantRegistration: (
        regionId,
        service,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      services:
                        region.services.map(
                          (item) =>
                            item.service ===
                            service
                              ? {
                                  ...item,

                                  acceptingNewMerchants:
                                    !item.acceptingNewMerchants,
                                }
                              : item,
                        ),

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      toggleRideType: (
        regionId,
        rideType,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      rides:
                        region.rides.map(
                          (item) =>
                            item.rideType ===
                            rideType
                              ? {
                                  ...item,

                                  enabled:
                                    !item.enabled,
                                }
                              : item,
                        ),

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      toggleRideDriverRegistration: (
        regionId,
        rideType,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      rides:
                        region.rides.map(
                          (item) =>
                            item.rideType ===
                            rideType
                              ? {
                                  ...item,

                                  acceptingNewDrivers:
                                    !item.acceptingNewDrivers,
                                }
                              : item,
                        ),

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      updateLocalization: (
        regionId,
        changes,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      localization: {
                        ...region.localization,
                        ...changes,
                      },

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      updateSupport: (
        regionId,
        changes,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      support: {
                        ...region.support,
                        ...changes,
                      },

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },

      updateOperations: (
        regionId,
        changes,
      ) => {
        set((state) => ({
          regions:
            state.regions.map(
              (region) =>
                region.id ===
                regionId
                  ? {
                      ...region,

                      operations: {
                        ...region.operations,
                        ...changes,
                      },

                      updatedAt:
                        new Date().toISOString(),
                    }
                  : region,
            ),
        }));
      },
    }),
  );