import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk' // 允许我们 dispatch() 函数
import logger from 'redux-logger' // 一个很便捷的 middleware，用来打印 action 日志
import reducer from '../reducer'

// eslint-disable-next-line import/no-mutable-exports
let store = null
if (process.env.NODE_ENV === 'production') {
	store = createStore(reducer, applyMiddleware(thunkMiddleware))
} else {
	store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))
}

export default store
