const prefix = 'Transfer_'

const defaultConfigure = {
  isFibosAccountExist: false,
  isFibosAccountValid: true,
  toTransfer: 'USDT',

  ethgasAPI: {},
  slow: undefined,
  average: undefined,
  fast: undefined,
  /*
  @feeType

  slow
  average
  fast
  */
  feeType: 'slow',
  estimating: false,

  gasLimit: undefined,

  /* mock */
}

export default (state = defaultConfigure, action) => {
  switch (action.type) {
    case `${prefix}changeFieldValue`: {
      return {
        ...state,
        [action.field]: action.value,
      }
    }
    default: {
      return state
    }
  }
}
