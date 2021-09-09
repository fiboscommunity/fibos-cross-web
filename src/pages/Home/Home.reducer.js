const prefix = 'Home_'

const defaultConfigure = {
  web3: null,
  crossFoContractInstance: null,
  fibos: null,
  account: null,
  notMainNet: false,
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
