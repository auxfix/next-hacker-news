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
  news: HackerStory[],
  vsnewscount: number,
  loading: boolean,
  listItemsCount: number,
}


const initialState: NewsState = {
    news: [], 
    loading: true, 
    vsnewscount: 5,
    listItemsCount: 200,
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    removeNewsItem(state, action: PayloadAction<number>) {
      state.news = state.news.filter(n => n.id !== action.payload);
    },
    setNewsCount(state, action: PayloadAction<number>) {
      state.vsnewscount = action.payload;
    },
    setListItemsCount(state, action: PayloadAction<number>) {
      state.listItemsCount = action.payload;
    },
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

export const { removeNewsItem, setNewsCount, setListItemsCount } = newsSlice.actions

export const getNewsSelector = (state: RootState) => state.news.news;
export const getNewsLoadingSelector = (state: RootState) => state.news.loading;
export const getNewsCountSelector = (state: RootState) => state.news.vsnewscount;
export const getListItemstCountSelector = (state: RootState) => state.news.listItemsCount;


export default newsSlice.reducer;