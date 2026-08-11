import {
  create,
} from "zustand";

import {
  dummyPassengerFlags,
  dummyPassengerRides,
  dummyPassengers,
  dummyPassengerSupportCases,
} from "../data/passengers";

import type {
  Passenger,
  PassengerFlag,
  PassengerFlagStatus,
  PassengerRide,
  PassengerStatus,
  PassengerSupportCase,
  PassengerSupportStatus,
} from "../types/passenger";

interface PassengerState {
  passengers: Passenger[];

  rides: PassengerRide[];

  flags: PassengerFlag[];

  supportCases:
    PassengerSupportCase[];

  setPassengerStatus: (
    passengerId: string,
    status: PassengerStatus,
  ) => void;

  adjustWalletBalance: (
    passengerId: string,
    amount: number,
  ) => void;

  setDefaultAddress: (
    passengerId: string,
    addressId: string,
  ) => void;

  setFlagStatus: (
    flagId: string,
    status: PassengerFlagStatus,
  ) => void;

  setSupportStatus: (
    caseId: string,
    status: PassengerSupportStatus,
  ) => void;
}

export const usePassengerStore =
  create<PassengerState>(
    (set) => ({
      passengers:
        dummyPassengers,

      rides:
        dummyPassengerRides,

      flags:
        dummyPassengerFlags,

      supportCases:
        dummyPassengerSupportCases,

      setPassengerStatus: (
        passengerId,
        status,
      ) => {
        set((state) => ({
          passengers:
            state.passengers.map(
              (passenger) =>
                passenger.id ===
                passengerId
                  ? {
                      ...passenger,
                      status,
                    }
                  : passenger,
            ),
        }));
      },

      adjustWalletBalance: (
        passengerId,
        amount,
      ) => {
        set((state) => ({
          passengers:
            state.passengers.map(
              (passenger) =>
                passenger.id ===
                passengerId
                  ? {
                      ...passenger,

                      wallet: {
                        ...passenger.wallet,

                        balance:
                          Math.max(
                            0,
                            passenger.wallet
                              .balance +
                              amount,
                          ),
                      },
                    }
                  : passenger,
            ),
        }));
      },

      setDefaultAddress: (
        passengerId,
        addressId,
      ) => {
        set((state) => ({
          passengers:
            state.passengers.map(
              (passenger) =>
                passenger.id ===
                passengerId
                  ? {
                      ...passenger,

                      addresses:
                        passenger.addresses.map(
                          (address) => ({
                            ...address,

                            default:
                              address.id ===
                              addressId,
                          }),
                        ),
                    }
                  : passenger,
            ),
        }));
      },

      setFlagStatus: (
        flagId,
        status,
      ) => {
        set((state) => ({
          flags:
            state.flags.map(
              (flag) =>
                flag.id === flagId
                  ? {
                      ...flag,

                      status,

                      resolvedAt:
                        status ===
                        "resolved"
                          ? new Date().toISOString()
                          : undefined,
                    }
                  : flag,
            ),
        }));
      },

      setSupportStatus: (
        caseId,
        status,
      ) => {
        set((state) => ({
          supportCases:
            state.supportCases.map(
              (supportCase) =>
                supportCase.id ===
                caseId
                  ? {
                      ...supportCase,
                      status,
                    }
                  : supportCase,
            ),
        }));
      },
    }),
  );