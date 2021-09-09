import { combineReducers } from 'redux'

import home from 'Pages/Home/Home.reducer'
import transfer from 'Pages/Transfer/Transfer.reducer'

export default combineReducers({
  home,
  transfer,
})
