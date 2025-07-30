import {
  fetchWithRefresh,
  getUserApi,
  loginUserApi,
  logoutApi,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { log } from 'console';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { RootState } from '../../../services/store';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      if (!response.success) {
        return rejectWithValue(response);
      }
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      if (!response.success) {
        return rejectWithValue(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      await logoutApi();
    } catch (error) {
      console.log('Ошибка выполнения выхода:', error);
    } finally {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      dispatch(userLogout());
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.payload as string;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      });
  }
});

export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
export const userDataSelector = (state: RootState) => state.user.data;
export const isAuthenticatedSelector = (state: RootState) =>
  state.user.isAuthenticated;
export const loginUserRequestSelector = (state: RootState) =>
  state.user.loginUserRequest;
export const loginUserErrorSelector = (state: RootState) =>
  state.user.loginUserError;

export const { authChecked, userLogout } = userSlice.actions;
export default userSlice.reducer;
