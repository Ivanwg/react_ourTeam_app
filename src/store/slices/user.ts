import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const KEY_TOKEN = 'TEAM_TOKEN';
const KEY_LIKES = 'TEAM_LIKES';

interface IRegisterProps {
  mail: string;
  password: string;
}


interface IUserData {
  token: string | null;
  likesList: Array<number>;
  mounted: boolean;
}

interface IState {
  userData: IUserData,
  status: 'load' | 'rejected' | 'resolved' | null,
  err: string | null,
}

const initialState: IState = {
  userData: {
    token: null,
    likesList: [],
    mounted: false
  },
  status: null,
  err: null, 
}

export const fetchRegister = createAsyncThunk(
  'userData/fetchRegister',
  async ({mail, password}: IRegisterProps) => {
    localStorage.removeItem(KEY_TOKEN);
    return axios.post(
      'https://reqres.in/api/register', {
        'email': 'eve.holt@reqres.in',
        'password': 'pistol'
    }).then((res) => {
        const data = res.data.token as string;
        return data;
    })
  }
);

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getStorageData(state) {
      const storageToken = localStorage.getItem(KEY_TOKEN);
      const storageLikes = localStorage.getItem(KEY_LIKES);
      if (storageToken) {
        state.userData.token = storageToken;
      }
      if (storageLikes) {
        state.userData.likesList = JSON.parse(storageLikes) as Array<number>;
      }
      state.userData.mounted = true;
    },
    deleteToken(state) {
      localStorage.removeItem(KEY_TOKEN);
      state.userData.token = null;
    },
    deleteLikes(state) {
      localStorage.removeItem(KEY_LIKES);
      state.userData.likesList = [];
    },
    appendLike(state, action) {
      state.userData.likesList.push(action.payload);
      localStorage.setItem(KEY_LIKES, JSON.stringify(state.userData.likesList));
    },
    deleteOneLike(state, action) {
      state.userData.likesList = state.userData.likesList.filter(id => id !== action.payload)
      localStorage.setItem(KEY_LIKES, JSON.stringify(state.userData.likesList));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'load';
      state.err = null;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = 'rejected';
      state.err = 'Произошла ошибка. Повторите запрос позднее.';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.userData.token = action.payload;
      localStorage.setItem(KEY_TOKEN, state.userData.token);
      state.err = null;
    })
  },
})


export const { getStorageData, deleteToken, appendLike, deleteLikes, deleteOneLike } = userSlice.actions;

export default userSlice.reducer;













