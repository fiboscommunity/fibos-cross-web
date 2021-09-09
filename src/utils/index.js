import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BigNumber from 'bignumber.js'

export { default as req } from './req'
// export { default as socket } from './socket'
export { default as stringToName } from './stringToName'

export { number2chinese, getFullNum } from './number2chinese'

export const getPrecision = data => {
  const snumber = data + ''
  const dotIndex = snumber.indexOf('.')

  const result = dotIndex === -1 ? 0 : snumber.substring(dotIndex + 1).length

  return result
}

export const getShowPrecision = (data, precision) => {
  if (typeof data !== 'string') {
    // throw 'Data type error'
  }
  const tmp = new BigNumber(data + '')
  const res = tmp.toFixed(precision, 1) // 1 means 截取
  return res
}

export function customizedConnect(stateIndex, actions, component) {
  const mapStateToProps = state => {
    const { web3, fibos, account, crossFoContractInstance, notMainNet } = state.home
    return { web3, fibos, account, crossFoContractInstance, notMainNet, ...state[stateIndex] }
  }

  const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(component)
}

export function reactElementOrComp(ele, props) {
  if (typeof ele === 'function') {
    const Ele = ele
    return <Ele {...props} />
  }

  return React.cloneElement(ele, props)
}

export function payLabelCompletion(num) {
  return '000'.concat(num).substr(-3, 3)
}
