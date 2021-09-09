import logoIcon from 'Assets/logo.svg'
import info1Bg from 'Assets/info1Bg.png'
import info1Pic from 'Assets/info1.png'
import info2Bg from 'Assets/info2Bg.png'
import info2Pic from 'Assets/info2Pic.png'
import advantagesBg from 'Assets/advantagesBg.png'
import expectationsBg from 'Assets/expectationsBg.png'

import adv_1 from 'Assets/adv_1.png'
import adv_2 from 'Assets/adv_2.png'
import adv_3 from 'Assets/adv_3.png'
import adv_4 from 'Assets/adv_4.png'

import exp_1 from 'Assets/exp_1.png'
import exp_2 from 'Assets/exp_2.png'

export const websiteName = 'cross.fo'
export const websiteLogo = logoIcon

export const mainPageConfig = {
  banner: {
    label: '去中心化跨链稳定币',
    label_translate: 'Decentralized cross-chain stable coins',
  },
  info1: {
    content: '面对波动，稳定币是可靠的稳定资源，不用担心其价值上涨或下跌。',
    backgroundImg: info1Bg,
    picData: info1Pic,
  },
  info2: {
    content: '多种稳定币自由选择，更灵活，更丰富',
    tips: '兑换·支付·交易',
    backgroundImg: info2Bg,
    picData: info2Pic,
  },
  advantages: {
    label: '技术优势',
    data: [
      {
        type: 'info',
        label: '稳定',
        picData: adv_1,
        content: '去中心化跨链实现原网络资产到FIBOS链上稳定币的1:1映射',
      },
      {
        type: 'info',
        label: '安全',
        picData: adv_2,
        content: '跨链机制引入智能合约和矿工角色，实现真正去中心化跨链',
      },
      {
        type: 'info',
        label: '开放',
        picData: adv_3,
        content: '无准入限制，任何人都可以成为矿工，参与完成稳定币跨链',
      },
      {
        type: 'info',
        label: '透明',
        picData: adv_4,
        content: '基于智能合约，无中心化风险，跨链无需任何人为参与，可信',
      },
    ],
    backgroundImg: advantagesBg,
  },
  expectations: {
    label: '应用展望',
    data: [
      {
        type: 'info',
        label: '供应链金融',
        picData: exp_1,
        content: '搭建流通资产的信任基础，解决双方信任问题',
      },
      {
        type: 'info',
        label: '跨境支付',
        picData: exp_2,
        content: '随时交易、不受限制、费用低、速度快',
      },
      {
        type: 'waiting',
        label: '未来已来\n敬请期待\n...',
      },
    ],
    backgroundImg: expectationsBg,
  },
}

export const footerContext = 'Copyright © 2019 FIBOS FOUNDATION LTD All Right Reserved'

/* f**k eth */
/* & web3 */
export const network = {
  account: 'eosio.cross',
  protocol: 'https',
  hostport: () => {
    // return 'api.testnet.fo:80'
    // return 'to-rpc.fibos.io:8870'
    return 'to-rpc.fibos.io'
  },
}

// export const netId = process.env.NODE_ENV === 'production' ? '1' : '3'
// todo
// 3 testnet ropstan
// export const netId = '3'
// 1 mainnet
export const netId = '1'

// export const ethGasAPIUrl =
//   process.env.NODE_ENV === 'production'
//     ? 'https://ethgasstation.info/json/ethgasAPI.json'
//     : '/ethgasAPI'

export const ethGasAPIUrl = '/ethgasAPI'

export const ethDecimalNum = 1e18
export const ethDecimal = 18

export const ethTransferGasLimit = 22872
export const gweiPerEth = 1000000000

//used to tranfer
// todo
// testnet ropstan
// export const erc20AddressUSDT = '0xfa85865bdc48bf96f1fe0f0cd6a86e0fd8c9360d'
// mainnet
export const erc20AddressUSDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

// todo
// testnet ropstan
// export const erc20AddressDAI = '0xca9f289a6f9ed9e3770ffb32dfe1a523385bef57'
// mainnet
export const erc20AddressDAI = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'

//register && target address
// todo
// testnet ropstan
// export const crossFoContractAddress = '0x4152e64d1d3944dd0f6d0893cbac90d0dda807f3'
// mainnet
export const crossFoContractAddress = '0x8cbd6dFDD2Cc917793746613A648c600AFB020b1'

export const gasPre = 9
export const AmountPre = 6

export const usdtDecimalNum = 1e6

export const daiDecimalNum = 1e18

export { default as crossFoAbi } from './abi/cross'
export { default as usdtAbi } from './abi/USDT'
export { default as daiAbi } from './abi/USDT'
