import {createSlice} from '@reduxjs/toolkit';
import {authApi, profileApi, verifyApi} from '../../../Services';

const initialState = {
  token: '',
  user: null,
};
const slice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.createAccount.matchFulfilled,
      (state, {payload}) => {
        state.user = {id: payload?.id};
      },
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        state.user = {id: payload?.id};
      },
    );
    builder.addMatcher(
      verifyApi.endpoints.verifyOtp.matchFulfilled,
      (state, {payload}) => {
        state.user = {...state.user, ...payload?.user};
      },
    );
    builder.addMatcher(
      authApi.endpoints.googleAuth.matchFulfilled,
      (state, {payload}) => {
        const {token, ...rest} = payload;
        state.user = {id: rest?.id};
        state.token = token;
      },
    );
    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, {payload}) => {
        let newUser = {...state.user};
        newUser = {...newUser, ...payload};
        state.user = newUser;
      },
    );

    builder.addMatcher(
      authApi.endpoints.updateUser.matchFulfilled,
      (state, {payload}) => {
        let newUser = {...state.user};
        newUser = {...newUser, ...payload};
        state.user = newUser;
      },
    );
    builder.addMatcher(
      profileApi.endpoints.addAddress.matchFulfilled,
      (state, {payload}) => {
        if (payload?.data?.shippingAddress) {
          state.user = {
            ...state.user,
            shippingAddress: payload?.data?.shippingAddress ?? [],
          };
        } else {
          state.user = {
            ...state.user,
            billingAddress: payload?.data?.billingAddress ?? [],
          };
        }
      },
    );
    builder.addMatcher(
      profileApi.endpoints.deleteAddress.matchFulfilled,
      (state, {payload}) => {
        if (payload?.data?.shippingAddress) {
          state.user = {
            ...state.user,
            shippingAddress: payload?.data?.shippingAddress ?? [],
          };
        } else {
          state.user = {
            ...state.user,
            billingAddress: payload?.data?.billingAddress ?? [],
          };
        }
      },
    );
  },
  reducers: {
    logoutUser: state => {
      state.token = '';
      state.user = null;
    },
    setToken: (state, action) => {
      state.token = action?.payload;
    },
    setUser: (state, action) => {
      state.user = action?.payload;
    },
  },
});
export const {logoutUser, setToken, setUser} = slice.actions;
export const selectUser = state => state.user.user ?? {};
export const selectToken = state => state.user.token;
export const userSliceReducer = slice.reducer;
