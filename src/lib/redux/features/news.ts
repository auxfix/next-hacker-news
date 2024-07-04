import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { HackerStory } from '@/types'
import { getNewsClient } from '@/lib/query/queries'


export const getNews = createAsyncThunk(
    'news/getNews',
    async () => {
      const response = await getNewsClient()
      return response
    }
  )


interface NewsState {
  news: HackerStory[]
  loading: boolean,
}


const initialState: NewsState = {
    news: [], loading: true,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
        state.loading = true;
      })
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload
      state.loading = false;
    })
  },

})

export const getNewsSelector = (state: RootState) => state.news.news;
export const getNewsLoadingSelector = (state: RootState) => state.news.loading;

export default newsSlice.reducer;