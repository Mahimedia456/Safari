import {
  create,
} from "zustand";

import {
  dummyMarkets,
} from "../data/regions";

import type {
  MarketLocalization,
  MarketOperations,
  MarketRideType,
  MarketServiceType,
  MarketStatus,
  MarketSupport,
  SafariMarket,
} from "../types/region";

interface MarketState {
  regions: SafariMarket[];

  setMarketStatus: (
    regionId: string,
    status: MarketStatus,
  ) => void;

  toggleService: (
    regionId: string,
    service: MarketServiceType,
  ) => void;

  toggleServiceMerchantRegistration: (
    regionId: string,
    service: MarketServiceType,
  ) => void;

  toggleRideType: (
    regionId: string,
    rideType: MarketRideType,
  ) => void;

  toggleRideDriverRegistration: (
    regionId: string,
    rideType: MarketRideType,
  ) => void;

  updateLocalization: (
    regionId: string,
    changes:
      Partial<MarketLocalization>,
  ) => void;

  updateSupport: (
    regionId: string,
    changes:
      Partial<MarketSupport>,
  ) => void;

  updateOperations: (
    regionId: string,
    changes:
      Partial<MarketOperations>,
  ) => void;
}

export const useMarketStore =
  create<MarketState>(
    (set) => ({
      regions: dummyMarkets,

      setMarketStatus: (
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