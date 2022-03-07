import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import userReducer from './user'
import customerStoreReducer from './customerStores'
import brandReducer from './brand'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    store: customerStoreReducer,
    brand: brandReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
