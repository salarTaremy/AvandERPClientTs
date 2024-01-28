import { createStore } from 'redux'
import { persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage' 

const initialState = {
  sidebarShow: true,
  asideShow: false,
  sidebarUnfoldable: false,
  theme: 'light',
  autUser: null,
  filterDrawerPlacement :'right',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const persistConfig = {
  key: 'root', 
  storage, // (local storage)
}
const persistedReducer = persistReducer(persistConfig, changeState) 
const store = createStore(persistedReducer) 
//const store = createStore(changeState)

export default store
