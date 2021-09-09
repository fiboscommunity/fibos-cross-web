import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import classnames from 'classnames'

import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css'
import Select from 'antd/lib/select'
import 'antd/lib/select/style/css'
import InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import message from 'antd/lib/message'
import 'antd/lib/message/style/css'
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'
import notification from 'antd/lib/notification'
import 'antd/lib/notification/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'

import BigNumber from 'bignumber.js'

import { ScreenLarge } from 'Components'

import {
  network,
  crossFoAbi,
  ethGasAPIUrl,
  ethDecimalNum,
  ethDecimal,
  ethTransferGasLimit,
  gweiPerEth,
  erc20AddressUSDT,
  erc20AddressDAI,
  crossFoContractAddress,
  gasPre,
  AmountPre,
} from 'Config'
import { usdtAbi, usdtDecimalNum } from 'Config'
import { daiAbi, daiDecimalNum } from 'Config'

import { customizedConnect, req, stringToName, getPrecision } from 'Utils'

import * as actions from './Transfer.action'
import styles from './Transfer.module.css'

import rightPic from 'Assets/right.png'

message.config({
  duration: 5,
})

class Transfer extends PureComponent {
  constructor(props, context) {
    super(props, context)

    this.timer = null
    this.waitingStatus = false
    this.delay = 5000

    this.debounce = (cb, delay) => {
      return event => {
        if (this.waitingStatus) {
          return message.warning('请勿频繁点击')
        }

        event.persist && event.persist()

        clearTimeout(this.timer)

        this.waitingStatus = true
        this.timer = setTimeout(() => {
          if (cb) {
            cb()
          }
          this.waitingStatus = false
        }, delay)
      }
    }
  }
  _goto = (pathname, ops) => {
    this.props.history.push({
      pathname,
      state: {
        ...ops,
      },
    })
  }

  checkFibosAccount = (account, { successCallback, failureCallback }) => {
    const { fibos } = this.props

    if (fibos) {
      fibos
        .getAccount(account)
        .then(reponse => {
          if (reponse && reponse.account_name === account) {
            if (successCallback) {
              successCallback(reponse, true)
            }
          }
        })
        .catch(error => {
          if (failureCallback) {
            failureCallback(error, false)
          }
        })
    }
  }

  checkMapState = account => {
    const { fibos, changeFieldValue } = this.props

    if (fibos) {
      fibos
        .getTableRows({
          json: true,
          code: network.account,
          scope: network.account,
          table: 'accountmap',
          limit: 5000,
        })
        .then(reponse => {
          const { rows } = reponse

          let tmp_isFibosAccountValid = false

          rows.forEach(item => {
            if (!tmp_isFibosAccountValid && item.account === account) {
              tmp_isFibosAccountValid = true
            }
          })

          changeFieldValue('isFibosAccountValid', tmp_isFibosAccountValid)
        })
        .catch(error => {
          throw new Error(error)
        })
    }
  }

  getEthGasAPI = () => {
    const { changeFieldValue } = this.props

    // return process.env.NODE_ENV === 'production' ? req.get(ethGasAPIUrl) : $.get(ethGasAPIUrl)
    return req.get(ethGasAPIUrl)
  }

  ethTransfer = (amount, callback) => {
    const { web3, account } = this.props

    if (web3 && amount) {
      web3.eth.sendTransaction(
        {
          to: crossFoContractAddress,
          from: account,
          value: new BigNumber(amount).times(ethDecimalNum).toFixed(AmountPre),
        },
        callback,
      )
    }
  }

  getGasPrice = ethgasAPI => {
    const { feeType } = this.props
    let gasPrice = ''
    switch (feeType) {
      case 'slow':
        gasPrice = (ethgasAPI.safeLow / 10) * gweiPerEth
        break
      case 'average':
        gasPrice = (ethgasAPI.fast / 10) * gweiPerEth
        break
      case 'fast':
        gasPrice = (ethgasAPI.fastest / 10) * gweiPerEth
        break
      default:
        break
    }

    return gasPrice
  }

  register = (account, gasLimit, callback) => {
    const { crossFoContractInstance, changeFieldValue } = this.props

    this.getEthGasAPI().then(ethgasAPI => {
      changeFieldValue('ethgasAPI', ethgasAPI)

      crossFoContractInstance.register(
        account,
        {
          gasPrice: this.getGasPrice(ethgasAPI),
          gasLimit: new BigNumber(gasLimit).times(1.5).toFixed(AmountPre),
        },
        callback,
      )
    })
  }

  estimateGasLimit_register = callback => {
    const { web3, account, crossFoContractInstance } = this.props

    const registerData = crossFoContractInstance.register.getData(account)

    web3.eth.estimateGas(
      {
        from: account,
        to: crossFoContractAddress,
        data: registerData,
      },
      callback,
    )
  }

  erc20Transfer = (amount, erc20Abi, erc20ContractAddress, targetAddress, gasLimit, callback) => {
    //erc20 transfer
    const { web3, toTransfer, changeFieldValue } = this.props

    const erc20TokenContract = web3.eth.contract(erc20Abi)
    const erc20TokenContractInstance = erc20TokenContract.at(erc20ContractAddress)

    this.getEthGasAPI().then(ethgasAPI => {
      changeFieldValue('ethgasAPI', ethgasAPI)

      erc20TokenContractInstance.transfer(
        targetAddress,
        new BigNumber(amount)
          .times(toTransfer === 'USDT' ? usdtDecimalNum : daiDecimalNum)
          .toFixed(AmountPre),
        {
          gasPrice: this.getGasPrice(ethgasAPI),
          gasLimit: new BigNumber(gasLimit).times(1.5).toFixed(AmountPre),
        },
        callback,
      )
    })
  }

  estimateGasLimit_transfer = ({ type, erc20Abi, erc20ContractAddress, amount }, callback) => {
    const { web3, toTransfer } = this.props

    switch (type) {
      case 'ETH':
        callback(undefined, ethTransferGasLimit)

        break

      default:
        const erc20TokenContract = web3.eth.contract(erc20Abi)
        const erc20TokenContractInstance = erc20TokenContract.at(erc20ContractAddress)

        const defaultTransferData = erc20TokenContractInstance.transfer.getData(
          //destination
          crossFoContractAddress,
          new BigNumber(amount)
            .times(toTransfer === 'USDT' ? usdtDecimalNum : daiDecimalNum)
            .toFixed(AmountPre),
        )

        web3.eth.estimateGas(
          {
            from: web3.eth.coinbase,
            //transaction to use
            to: toTransfer === 'USDT' ? erc20AddressUSDT : erc20AddressDAI,
            data: defaultTransferData,
          },
          callback,
        )
        break
    }
  }

  getFees = (ethgasAPI, gasLimit) => {
    // const fast = new BigNumber(ethgasAPI.fastest)
    //   .div(new BigNumber(10))
    //   .times(new BigNumber(gasLimit))
    //   .div(new BigNumber(gweiPerEth))
    //   .times(new BigNumber(1.5))
    //   .toFixed(gasPre)

    let slow = undefined
    try {
      slow = new BigNumber(ethgasAPI.safeLow)
        .times(new BigNumber(gasLimit))
        .times(new BigNumber(1.5 / 10 / gweiPerEth))
        .toFixed(gasPre)
    } catch (error) {}

    let average = undefined
    try {
      average = new BigNumber(ethgasAPI.fast)
        .times(new BigNumber(gasLimit))
        .times(new BigNumber(1.5 / 10 / gweiPerEth))
        .toFixed(gasPre)
    } catch (error) {}

    let fast = undefined
    try {
      fast = new BigNumber(ethgasAPI.fastest)
        .times(new BigNumber(gasLimit))
        .times(new BigNumber(1.5 / 10 / gweiPerEth))
        .toFixed(gasPre)
    } catch (error) {}

    return {
      slow: slow || '--',
      average: average || '--',
      fast: fast || '--',
    }
  }

  setFees = (ethgasAPI, gasLimit) => {
    const feeData = this.getFees(ethgasAPI, gasLimit)

    if (feeData) {
      const { slow, average, fast } = feeData
      const { changeFieldValue } = this.props

      changeFieldValue('slow', slow)
      changeFieldValue('average', average)
      changeFieldValue('fast', fast)

      changeFieldValue('estimating', false)
    }
  }

  addFees = (arg1, arg2) => {
    if (!arg1 || !arg2) return

    let slow = undefined
    try {
      slow = new BigNumber(arg1.slow).plus(new BigNumber(arg2.slow)).toFixed(gasPre)
    } catch (error) {}

    let average = undefined
    try {
      average = new BigNumber(arg1.average).plus(new BigNumber(arg2.average)).toFixed(gasPre)
    } catch (error) {}

    let fast = undefined
    try {
      fast = new BigNumber(arg1.fast).plus(new BigNumber(arg2.fast)).toFixed(gasPre)
    } catch (error) {}

    if (slow || average || fast) return

    const { changeFieldValue } = this.props

    changeFieldValue('slow', slow)
    changeFieldValue('average', average)
    changeFieldValue('fast', fast)

    changeFieldValue('estimating', false)

    return true
  }

  errorCollector = error => {
    const { changeFieldValue } = this.props

    if (error) {
      const errorStr = error.toString()
      if (errorStr.indexOf('User denied transaction signature') >= 0) {
        message.warning('用户拒绝签名')
      }
      if (errorStr.indexOf('gas required exceeds allowance') >= 0) {
        message.warning('用户通证数量不足')

        changeFieldValue('estimating', false)
      } else {
        message.warning('操作失败')
      }
    }
  }

  launch_register = (onlyEstimate, values, toTransfer, afterRegister) => {
    const { changeFieldValue } = this.props
    const { account, amount } = values

    this.getEthGasAPI().then(ethgasAPI => {
      changeFieldValue('ethgasAPI', ethgasAPI)
      let feeData_register = null

      this.estimateGasLimit_register((error, data) => {
        if (!error && data) {
          feeData_register = this.getFees(ethgasAPI, data)
        }

        if (!onlyEstimate) {
          this.register(stringToName(account), data, (error, data) => {
            if (!error && data) {
              message.success('映射请求成功,请耐心等待区块确认')

              if (afterRegister) {
                afterRegister(feeData_register)
              }
            }

            this.errorCollector(error)
          })
        } else {
          if (afterRegister) {
            afterRegister(feeData_register)
          }
        }
      })
    })
  }

  launch_transfer = (onlyEstimate, values, toTransfer, toBeAddedFeeObj) => {
    const { changeFieldValue } = this.props
    const { account, amount } = values

    if (toTransfer === 'ETH') {
      this.getEthGasAPI().then(ethgasAPI => {
        changeFieldValue('ethgasAPI', ethgasAPI)

        this.estimateGasLimit_transfer(
          {
            type: 'ETH',
            account,
            amount,
          },
          (error, data) => {
            if (!error && data) {
              if (!toBeAddedFeeObj) {
                this.setFees(ethgasAPI, data)
              } else {
                this.addFees(toBeAddedFeeObj, this.getFees(ethgasAPI, data))
              }
            }

            this.errorCollector(error)
          },
        )
      })

      if (!onlyEstimate) {
        this.ethTransfer(amount, (error, data) => {
          if (!error && data) {
            message.success('转账请求成功,请耐心等待区块确认')
          }

          this.errorCollector(error)
        })
      }

      return true
    } else if (toTransfer === 'USDT') {
      this.getEthGasAPI().then(ethgasAPI => {
        changeFieldValue('ethgasAPI', ethgasAPI)

        this.estimateGasLimit_transfer(
          {
            type: 'USDT',
            erc20Abi: usdtAbi,
            erc20ContractAddress: erc20AddressUSDT,
            account,
            amount,
          },
          (error, data) => {
            if (!error && data) {
              if (!toBeAddedFeeObj) {
                this.setFees(ethgasAPI, data)
              } else {
                this.addFees(toBeAddedFeeObj, this.getFees(ethgasAPI, data))
              }

              if (!onlyEstimate) {
                this.erc20Transfer(
                  amount,
                  usdtAbi,
                  erc20AddressUSDT,
                  crossFoContractAddress,
                  data,
                  (error, data) => {
                    if (!error && data) {
                      message.success('转账请求成功,请耐心等待区块确认')
                    }

                    this.errorCollector(error)
                  },
                )
              }
            }

            this.errorCollector(error)
          },
        )
      })

      return true
    } else if (toTransfer === 'DAI') {
      this.getEthGasAPI().then(ethgasAPI => {
        changeFieldValue('ethgasAPI', ethgasAPI)

        this.estimateGasLimit_transfer(
          {
            type: 'DAI',
            erc20Abi: daiAbi,
            erc20ContractAddress: erc20AddressDAI,
            account,
            amount,
          },
          (error, data) => {
            if (!error && data) {
              if (!toBeAddedFeeObj) {
                this.setFees(ethgasAPI, data)
              } else {
                this.addFees(toBeAddedFeeObj, this.getFees(ethgasAPI, data))
              }

              if (!onlyEstimate) {
                this.erc20Transfer(
                  amount,
                  daiAbi,
                  erc20AddressDAI,
                  crossFoContractAddress,
                  data,
                  (error, data) => {
                    if (!error && data) {
                      message.success('转账请求成功,请耐心等待区块确认')
                    }

                    this.errorCollector(error)
                  },
                )
              }
            }

            this.errorCollector(error)
          },
        )
      })

      return true
    }
  }

  openNotification = (message, description, type, callback) => {
    if (message || description) {
      notification.open({
        key: this.key,
        className: styles.notification,
        message: message || '',
        description: description || '',
        duration: 15,
        onClick: e => {
          console.log('Notification Clicked!', e)
          if (callback) {
            callback()
          }
        },
        icon:
          type !== 'info' ? (
            <Icon type="frown" style={{ color: 'red' }} />
          ) : (
            <Icon type="smile" style={{ color: '#108ee9' }} />
          ),
        style: {
          width: 'auto',
        },
        placement: 'bottomLeft',
      })
    }
  }

  launch = (onlyEstimate, values, toTransfer) => {
    const { isFibosAccountValid, changeFieldValue, web3 } = this.props
    const { account, amount } = values

    if (!web3) {
      this.openNotification(
        '出错',
        <div>
          未检测到 Metamask 插件。请先
          <a
            href="https://github.com/MetaMask/metamask-extension/releases"
            className={styles.downloadLink}
            target="_blank">
            下载
          </a>
          并登录 MetaMask 插件。登录之后，刷新页面。
        </div>,
        'warning',
      )
      return
    }
    if (!amount) return

    if (!account) {
      return this.launch_transfer(onlyEstimate, values, toTransfer)
    } else {
      if (isFibosAccountValid) {
        this.launch_transfer(onlyEstimate, values, toTransfer)
      } else {
        this.launch_register(onlyEstimate, values, toTransfer, launch_register_fee => {
          this.launch_transfer(onlyEstimate, values, toTransfer, launch_register_fee)
        })
      }
    }
  }

  onAmountBlur = () => {
    const { form, toTransfer, changeFieldValue, web3 } = this.props
    const { validateFields } = form

    if (!web3) return

    validateFields(['amount'], (errors, values) => {
      if (!errors && values) {
        changeFieldValue('estimating', true)

        return this.launch(true, values, toTransfer)
      }
    })
  }

  onAccountBlur = () => {
    const { form, toTransfer, changeFieldValue, web3 } = this.props
    const { validateFields, getFieldValue } = form

    if (!web3) return
    validateFields(['account'], (errors, values) => {
      if (!errors && values) {
        const tmp_amount = getFieldValue('amount')

        if (tmp_amount) {
          changeFieldValue('estimating', true)
          this.launch(
            true,
            {
              ...values,
              amount: tmp_amount,
            },
            toTransfer,
          )
        }
      }
    })
  }

  confirm = () => {
    const { form, isFibosAccountValid, toTransfer } = this.props
    const { validateFields } = form

    validateFields(['account', 'amount'], (errors, values) => {
      if (!errors && values) {
        return this.launch(false, values, toTransfer)
      }
    })
  }

  componentDidMount() {}

  render() {
    const {
      isFibosAccountExist,
      isFibosAccountValid,
      toTransfer,
      ethgasAPI,
      slow,
      average,
      fast,
      feeType,
      notMainNet,
      estimating,
      changeFieldValue,
    } = this.props
    const { getFieldDecorator, getFieldValue, getFieldsValue } = this.props.form

    return (
      <div className={styles.wrapper}>
        <ScreenLarge>
          {matches => {
            return (
              <div className={styles.content}>
                <div className={styles.title}>{`快速将 ETH 链上通证转入 FIBOS`}</div>
                <div className={styles.supportTips}>{`目前支持: USDT, DAI`}</div>
                <div className={styles.netWarning}>
                  {notMainNet ? `请连接到 Ethereum 主网` : ''}
                </div>
                <div className={styles.mapStatusWarning}>
                  {!isFibosAccountValid &&
                  /^[a-z1-5.]{5,12}$/.test(getFieldValue('account')) &&
                  isFibosAccountExist
                    ? `账号未映射`
                    : ''}
                </div>
                <div className={styles.accountWrapper}>
                  <Form>
                    <Form.Item>
                      {getFieldDecorator('account', {
                        initialValue: '',
                        validateFirst: true,
                        rules: [
                          {
                            validator: (rule, value, callback) => {
                              if (value === '') return callback()
                              if (!/^[a-z1-5.]{5,12}$/.test(value)) {
                                return callback('账号格式错误')
                              } else {
                                return callback()
                              }
                            },
                          },
                          {
                            validator: (rule, value, callback) => {
                              if (value === '') return callback()
                              this.checkFibosAccount(value, {
                                successCallback: res => {
                                  changeFieldValue('isFibosAccountExist', true)
                                  return callback()
                                },
                                failureCallback: err => {
                                  changeFieldValue('isFibosAccountExist', false)
                                  return callback('账号不存在')
                                },
                              })
                            },
                          },
                          {
                            validator: (rule, value, callback) => {
                              this.checkMapState(value)
                              return callback()
                            },
                          },
                        ],
                      })(
                        <Input
                          className={styles.accountInput}
                          type="value"
                          autoComplete="off"
                          allowClear
                          maxLength={12}
                          placeholder="请输入 FIBOS 账户"
                          onBlur={e => {
                            this.onAccountBlur()
                          }}
                        />,
                      )}
                    </Form.Item>
                  </Form>
                </div>
                <div className={styles.amountWrapper}>
                  {'[object Boolean]' === Object.prototype.toString.call(isFibosAccountExist) &&
                    !isFibosAccountExist && (
                      <div className={styles.foTips}>
                        <div className={styles.foTipsText}>
                          还没有 FIBOS 账户？下载
                          <a href="https://wallet.fo" target="_blank">
                            FO 钱包
                          </a>
                          获取！
                        </div>
                      </div>
                    )}
                  <Form className={styles.amountForm}>
                    <Form.Item>
                      {getFieldDecorator('amount', {
                        initialValue: undefined,
                        validateFirst: true,
                        rules: [
                          {
                            validator: (rule, value, callback) => {
                              const tmp = parseFloat(value)

                              if (isNaN(tmp)) {
                                return callback('请输入正确数字')
                              } else {
                                return callback()
                              }
                            },
                          },
                          {
                            validator: (rule, value, callback) => {
                              if (getPrecision(value) <= AmountPre) {
                                return callback()
                              } else {
                                return callback(`最小精度可转 ${10 ** -AmountPre}`)
                              }
                            },
                          },
                        ],
                      })(
                        <Input
                          className={styles.amountInput}
                          type="number"
                          min={0}
                          placeholder={`请输入你要转入的数量(最小精度可转 ${10 ** -AmountPre})`}
                          autoComplete="off"
                          allowClear
                          // suffix={<div className={styles.suffix}>USDT</div>}
                          addonAfter={
                            <Select
                              defaultValue={toTransfer}
                              onChange={e => {
                                changeFieldValue('toTransfer', e)
                                this.launch(true, getFieldsValue(['account', 'amount']), e)
                              }}>
                              <Select.Option value="USDT">USDT</Select.Option>
                              <Select.Option value="DAI">DAI</Select.Option>
                            </Select>
                          }
                          onChange={e => {
                            changeFieldValue('amount', e)
                          }}
                          onBlur={e => {
                            this.onAmountBlur()
                          }}
                        />,
                      )}
                    </Form.Item>
                  </Form>
                </div>
                <div className={styles.feeWrapper}>
                  <div className={styles.fee}>
                    <div className={styles.feeWrapperTitle}>矿工费</div>
                    <div
                      className={
                        feeType === 'slow' ? classnames(styles.slow, styles.selected) : styles.slow
                      }
                      onClick={() => {
                        changeFieldValue('feeType', 'slow')
                      }}>
                      <Spin spinning={estimating}>
                        <div className={styles.feeTitle}>{`slow`}</div>
                        <div className={styles.feeDurtionWrapper}>
                          <div className={styles.feeDurtion}>
                            {`~ ${!!ethgasAPI ? ethgasAPI.safeLowWait || '--' : '--'}`}
                          </div>
                          <div className={styles.feeDurtionSuffix}>{`min`}</div>
                        </div>
                        <div className={styles.feeAmountWrapper}>
                          <div className={styles.feeAmount}>{`~ ${slow || '--'}`}</div>
                          <div className={styles.feeAmountSuffix}>{`ETH`}</div>
                        </div>
                        <div className={styles.rightPicWrapper}>
                          <img className={styles.rightPic} src={rightPic} alt="" />
                        </div>
                      </Spin>
                    </div>
                    <div
                      className={
                        feeType === 'average'
                          ? classnames(styles.average, styles.selected)
                          : styles.average
                      }
                      onClick={() => {
                        changeFieldValue('feeType', 'average')
                      }}>
                      <Spin spinning={estimating}>
                        <div className={styles.feeTitle}>{`average`}</div>
                        <div className={styles.feeDurtionWrapper}>
                          <div className={styles.feeDurtion}>
                            {`~ ${!!ethgasAPI ? ethgasAPI.fastWait || '--' : '--'}`}
                          </div>
                          <div className={styles.feeDurtionSuffix}>{`min`}</div>
                        </div>
                        <div className={styles.feeAmountWrapper}>
                          <div className={styles.feeAmount}>{`~ ${average || '--'}`}</div>
                          <div className={styles.feeAmountSuffix}>{`ETH`}</div>
                        </div>
                        <div className={styles.rightPicWrapper}>
                          <img className={styles.rightPic} src={rightPic} alt="" />
                        </div>
                      </Spin>
                    </div>
                    <div
                      className={
                        feeType === 'fast' ? classnames(styles.fast, styles.selected) : styles.fast
                      }
                      onClick={() => {
                        changeFieldValue('feeType', 'fast')
                      }}>
                      <Spin spinning={estimating}>
                        <div className={styles.feeTitle}>{`fast`}</div>
                        <div className={styles.feeDurtionWrapper}>
                          <div className={styles.feeDurtion}>
                            {`~ ${!!ethgasAPI ? ethgasAPI.fastestWait || '--' : '--'}`}
                          </div>
                          <div className={styles.feeDurtionSuffix}>{`min`}</div>
                        </div>
                        <div className={styles.feeAmountWrapper}>
                          <div className={styles.feeAmount}>{`~ ${fast || '--'}`}</div>
                          <div className={styles.feeAmountSuffix}>{`ETH`}</div>
                        </div>
                        <div className={styles.rightPicWrapper}>
                          <img className={styles.rightPic} src={rightPic} alt="" />
                        </div>
                      </Spin>
                    </div>
                  </div>
                </div>
                <div className={styles.btnWrapper}>
                  <Button
                    className={styles.btn}
                    onClick={this.debounce(() => {
                      this.confirm()
                    }, this.delay)}>{`转账`}</Button>
                </div>
                <div
                  className={
                    styles.tips
                  }>{`注：转账时间受矿工费用及 ETH 网络情况多因素影响，请耐心等待！`}</div>
              </div>
            )
          }}
        </ScreenLarge>
      </div>
    )
  }
}

const TransferForm = Form.create({ name: 'transfer' })(Transfer)

export default customizedConnect('transfer', actions, withRouter(TransferForm))
