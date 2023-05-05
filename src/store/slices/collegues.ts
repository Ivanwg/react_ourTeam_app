import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const PER_PAGE = 4;
const KEY_COLLEGUES = 'COLLEGUES';

interface ICollegue {
  id: number;
  avatar: string;
  email: string;
  first_name: string;
  last_name: string;
}

type TColleguesList = Array<ICollegue>;

interface IFetchObj {
  data: TColleguesList;
  page: number;
  total: number;
}


interface IState {
  collegues: TColleguesList,
  nextPage: number | null,
  total: number,
  per: number,
  status: 'load' | 'rejected' | 'resolved' | null,
  err: string | null,
  mounted: boolean,
}

const initialState: IState = {
  collegues: [],
  nextPage: 1,
  total: 0,
  per: PER_PAGE,
  status: null,
  err: null, 
  mounted: false,
}

export const fetchCollegues = createAsyncThunk(
  'collegues/fetchCollegues',
  async (dispatch, { getState }) => {
    const globalState = getState() as RootState;
    const page = globalState.collegues.nextPage;
    if (!page) return;
    return axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${PER_PAGE}`
    ).then((res) => {
        const data = res.data as IFetchObj;
        return {
          list: data.data, page: data.page, total: data.total
        };
    })
  }
);

export const colleguesSlice = createSlice({
  name: 'collegues',
  initialState,
  reducers: {
    getStorageCollegues(state) {
      const list = sessionStorage.getItem(KEY_COLLEGUES);
      if (list) {
        const parsed = JSON.parse(list);
        if (parsed.collegues.length) {
          state.collegues = parsed.collegues;
          state.nextPage = parsed.nextPage;
          state.total = parsed.total;
          
        }
      }
      state.mounted = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCollegues.pending, (state) => {
      state.status = 'load';
      state.err = null;
    });
    builder.addCase(fetchCollegues.rejected, (state, action) => {
      state.status = 'rejected';
      state.err = 'Произошла ошибка. Повторите запрос позднее.';
    });
    builder.addCase(fetchCollegues.fulfilled, (state, action) => {
      state.status = 'resolved';
      if (action.payload) {
        state.collegues = state.collegues.concat(...action.payload.list);
        state.total = action.payload.total;
        state.nextPage = state.collegues.length < state.total && state.nextPage ? state.nextPage += 1 : null;
        sessionStorage.setItem(KEY_COLLEGUES, JSON.stringify({
          collegues: state.collegues,
          total: state.total,
          nextPage: state.nextPage
        }));
      }
      state.err = null;
    })
  },
})


export const { getStorageCollegues } = colleguesSlice.actions;

export default colleguesSlice.reducer;













