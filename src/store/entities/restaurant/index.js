import { createAction, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { initialEntitiesState } from "../index";

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: initialEntitiesState,
  reducers: {
    startLoading: (state) => {
      state.status = REQUEST_STATUSES.pending;
    },
    failLoading: (state) => {
      state.status = REQUEST_STATUSES.failed;
    },
    finishLoading: (state, { payload }) => {
      state.entities = payload.reduce((acc, restaurant) => {
        acc[restaurant.id] = restaurant;

        return acc;
      }, {});
      state.ids = payload.map(({ id }) => id);
      state.status = REQUEST_STATUSES.success;
    },
  },
});

export const restaurantActions = {
  ...restaurantSlice.actions,
  loadRestaurantsAction: createAction("restaurant/Load"),
};
