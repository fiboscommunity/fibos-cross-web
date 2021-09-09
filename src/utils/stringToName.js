import BigNumber from 'bignumber.js'

const charToSymbol = c => {
  if (c >= 97 && c <= 122) return c - 97 + 6
  if (c >= 49 && c <= 53) return c - 49 + 1

  return 0
}

const stringToName = str => {
  const len = str.length

  let value = new BigNumber(0)

  // eslint-disable-next-line
  for (let i = 0; i <= 12; ++i) {
    let c = 0
    if (i < len && i <= 12) {
      c = charToSymbol(str.charCodeAt(i))
    }

    if (i < 12) {
      // eslint-disable-next-line
      c &= 0x1f

      let bToC = new BigNumber(c)
      const two = new BigNumber(2)

      bToC = bToC.times(two.pow(64 - 5 * (i + 1)))

      value = value.plus(bToC)
    } else {
      // eslint-disable-next-line
      c &= 0x0f

      value = value.plus(c)
    }
  }

  return value.toFixed()
}

// const r = stringToName('amtbfr3rwhta')
// console.log(r)

export default stringToName
