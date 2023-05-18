import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export type AppDispatch = ThunkDispatch<RTCIceConnectionState, unknown, AnyAction>;