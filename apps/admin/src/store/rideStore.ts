import {
  create,
} from "zustand";

import {
  dummyAvailableDrivers,
  dummyRideIncidents,
  dummyRides,
} from "../data/rides";

import type {
  Ride,
  RideDriverOption,
  RideIncident,
  RideIncidentStatus,
  RideStatus,
} from "../types/ride";

interface RideStoreState {
  rides: Ride[];

  drivers:
    RideDriverOption[];

  incidents:
    RideIncident[];

  setRideStatus: (
    rideId: string,
    status: RideStatus,
  ) => void;

  assignDriver: (
    rideId: string,
    driverId: string,
  ) => void;

  cancelRide: (
    rideId: string,
    reason: string,
  ) => void;

  setIncidentStatus: (
    incidentId: string,
    status:
      RideIncidentStatus,
  ) => void;
}

export const useRideStore =
  create<RideStoreState>(
    (set, get) => ({
      rides: dummyRides,

      drivers:
        dummyAvailableDrivers,

      incidents:
        dummyRideIncidents,

      setRideStatus: (
        rideId,
        status,
      ) => {
        set((state) => ({
          rides:
            state.rides.map(
              (ride) => {
                if (
                  ride.id !==
                  rideId
                ) {
                  return ride;
                }

                const entry = {
                  id:
                    `RTL-${Date.now()}`,

                  title:
                    `Ride status changed to ${status.replace(
                      "_",
                      " ",
                    )}`,

                  createdAt:
                    new Date().toISOString(),
                };

                return {
                  ...ride,

                  status,

                  completedAt:
                    status ===
                    "completed"
                      ? new Date().toISOString()
                      : ride.completedAt,

                  timeline: [
                    ...ride.timeline,
                    entry,
                  ],
                };
              },
            ),
        }));
      },

      assignDriver: (
        rideId,
        driverId,
      ) => {
        const driver =
          get().drivers.find(
            (item) =>
              item.id ===
              driverId,
          );

        if (!driver) {
          return;
        }

        set((state) => ({
          rides:
            state.rides.map(
              (ride) =>
                ride.id ===
                rideId
                  ? {
                      ...ride,

                      driverId:
                        driver.id,

                      driverName:
                        driver.name,

                      driverPhone:
                        driver.phone,

                      vehicleName:
                        driver.vehicle,

                      vehiclePlate:
                        driver.vehiclePlate,

                      status:
                        "driver_assigned",

                      timeline: [
                        ...ride.timeline,

                        {
                          id:
                            `RTL-${Date.now()}`,

                          title:
                            "Driver assigned",

                          description:
                            `${driver.name} assigned manually by operations.`,

                          createdAt:
                            new Date().toISOString(),
                        },
                      ],
                    }
                  : ride,
            ),
        }));
      },

      cancelRide: (
        rideId,
        reason,
      ) => {
        set((state) => ({
          rides:
            state.rides.map(
              (ride) =>
                ride.id ===
                rideId
                  ? {
                      ...ride,

                      status:
                        "cancelled",

                      cancelledAt:
                        new Date().toISOString(),

                      cancelledBy:
                        "admin",

                      cancellationReason:
                        reason,

                      timeline: [
                        ...ride.timeline,

                        {
                          id:
                            `RTL-${Date.now()}`,

                          title:
                            "Ride cancelled",

                          description:
                            reason,

                          createdAt:
                            new Date().toISOString(),
                        },
                      ],
                    }
                  : ride,
            ),
        }));
      },

      setIncidentStatus: (
        incidentId,
        status,
      ) => {
        set((state) => ({
          incidents:
            state.incidents.map(
              (incident) =>
                incident.id ===
                incidentId
                  ? {
                      ...incident,
                      status,
                    }
                  : incident,
            ),
        }));
      },
    }),
  );