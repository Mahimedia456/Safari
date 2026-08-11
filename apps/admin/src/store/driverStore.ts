import {
  create,
} from "zustand";

import {
  dummyDriverApplications,
  dummyDriverRatings,
  dummyDrivers,
  dummyDriverVehicles,
} from "../data/drivers";

import type {
  Driver,
  DriverApplication,
  DriverApplicationStatus,
  DriverDocument,
  DriverRating,
  DriverStatus,
  DriverVehicle,
  DriverVerificationStatus,
} from "../types/driver";

interface DriverState {
  drivers: Driver[];

  applications:
    DriverApplication[];

  vehicles:
    DriverVehicle[];

  ratings:
    DriverRating[];

  setDriverStatus: (
    driverId: string,
    status: DriverStatus,
  ) => void;

  setDriverOnline: (
    driverId: string,
    online: boolean,
  ) => void;

  setApplicationStatus: (
    applicationId: string,
    status:
      DriverApplicationStatus,
    notes?: string,
  ) => void;

  setDocumentStatus: (
    driverId: string,
    documentId: string,
    status:
      DriverVerificationStatus,
  ) => void;

  setVehicleActive: (
    vehicleId: string,
    active: boolean,
  ) => void;

  setVehicleRegistrationStatus: (
    vehicleId: string,
    status:
      DriverVerificationStatus,
  ) => void;

  setVehicleInsuranceStatus: (
    vehicleId: string,
    status:
      DriverVerificationStatus,
  ) => void;
}

export const useDriverStore =
  create<DriverState>(
    (set) => ({
      drivers:
        dummyDrivers,

      applications:
        dummyDriverApplications,

      vehicles:
        dummyDriverVehicles,

      ratings:
        dummyDriverRatings,

      setDriverStatus: (
        driverId,
        status,
      ) => {
        set((state) => ({
          drivers:
            state.drivers.map(
              (driver) =>
                driver.id ===
                driverId
                  ? {
                      ...driver,

                      status,

                      online:
                        status ===
                        "active"
                          ? driver.online
                          : false,
                    }
                  : driver,
            ),
        }));
      },

      setDriverOnline: (
        driverId,
        online,
      ) => {
        set((state) => ({
          drivers:
            state.drivers.map(
              (driver) =>
                driver.id ===
                driverId
                  ? {
                      ...driver,

                      online,

                      status:
                        online
                          ? "active"
                          : driver.status ===
                              "active"
                            ? "offline"
                            : driver.status,

                      lastOnlineAt:
                        online
                          ? new Date().toISOString()
                          : driver.lastOnlineAt,
                    }
                  : driver,
            ),
        }));
      },

      setApplicationStatus: (
        applicationId,
        status,
        notes,
      ) => {
        set((state) => ({
          applications:
            state.applications.map(
              (application) =>
                application.id ===
                applicationId
                  ? {
                      ...application,

                      status,

                      reviewNotes:
                        notes,

                      reviewedAt:
                        new Date().toISOString(),
                    }
                  : application,
            ),
        }));
      },

      setDocumentStatus: (
        driverId,
        documentId,
        status,
      ) => {
        set((state) => ({
          drivers:
            state.drivers.map(
              (driver) => {
                if (
                  driver.id !==
                  driverId
                ) {
                  return driver;
                }

                const documents: DriverDocument[] =
                  driver.documents.map(
                    (document) =>
                      document.id ===
                      documentId
                        ? {
                            ...document,

                            status,

                            reviewedAt:
                              new Date().toISOString(),
                          }
                        : document,
                  );

                return {
                  ...driver,
                  documents,
                };
              },
            ),
        }));
      },

      setVehicleActive: (
        vehicleId,
        active,
      ) => {
        set((state) => ({
          vehicles:
            state.vehicles.map(
              (vehicle) =>
                vehicle.id ===
                vehicleId
                  ? {
                      ...vehicle,
                      active,
                    }
                  : vehicle,
            ),
        }));
      },

      setVehicleRegistrationStatus:
        (
          vehicleId,
          status,
        ) => {
          set((state) => ({
            vehicles:
              state.vehicles.map(
                (vehicle) =>
                  vehicle.id ===
                  vehicleId
                    ? {
                        ...vehicle,

                        registrationStatus:
                          status,
                      }
                    : vehicle,
              ),
          }));
        },

      setVehicleInsuranceStatus: (
        vehicleId,
        status,
      ) => {
        set((state) => ({
          vehicles:
            state.vehicles.map(
              (vehicle) =>
                vehicle.id ===
                vehicleId
                  ? {
                      ...vehicle,

                      insuranceStatus:
                        status,
                    }
                  : vehicle,
            ),
        }));
      },
    }),
  );