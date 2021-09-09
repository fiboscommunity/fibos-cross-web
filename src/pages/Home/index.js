import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import Fibos from 'fibos.js'

import { ScreenLarge } from 'Components'

import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import notification from 'antd/lib/notification'
import 'antd/lib/notification/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'

import { network, netId, crossFoAbi, crossFoContractAddress } from 'Config'
import { customizedConnect } from 'Utils'

import HomeRouter from 'Router'
import HomeHeader from './components/Header.js'
import HomeFooter from './components/Footer.js'

import * as actions from './Home.action'
import styles from './Home.module.css'

class Home extends PureComponent {
  static propTypes = {}

  constructor(props, context) {
    super(props, context)

    this.state = {}

    this.key = 'MetamaskStatus'
  }

  _goto = (pathname, ops) => {
    this.props.history.push({
      pathname,
      state: {
        ...ops,
      },
    })
  }

  realLeave = event => {
    const { isFresh } = this.props

    if (!isFresh) {
      event.returnValue = '确认离开?'
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

  dealAddress = account => {
    const { changeFieldValue } = this.props

    changeFieldValue('account', account)

    return this.openNotification(
      '您好',
      <div>
        <div>已连接 Metamask 插件</div>
        <br />
        <div>{`账户地址: ${account}`}</div>
      </div>,
      'info',
    )
  }
  wrongNet = () => {
    const { changeFieldValue } = this.props
    changeFieldValue('notMainNet', true)

    return this.openNotification('出错', '请连接 Metamask 到 Ethereum 主网', 'warning')
  }

  checkAccounts = web3 => {
    web3.currentProvider
      .enable()
      .then(accounts => {
        console.log('accounts:', accounts)
        if (accounts.length === 0) {
          return this.openNotification('出错', 'Metamask 插件中无可用账户。', 'warning')
        } else {
          web3.version.getNetwork((err, currentNetId) => {
            if (currentNetId === netId && !err) {
              const { changeFieldValue } = this.props
              this.dealAddress(accounts[0])

              changeFieldValue('web3', web3)

              const crossFoContract = web3.eth.contract(crossFoAbi)
              const crossFoContractInstance = crossFoContract.at(crossFoContractAddress)
              changeFieldValue('crossFoContractInstance', crossFoContractInstance)
              return
            } else {
              if (err) {
                return this.openNotification('出错', 'Metamask 网络发生未知错误', 'warning')
              } else {
                this.wrongNet()
              }
            }
          })
        }
      })
      .catch(reason => {
        console.log('reason:', reason)
        this.openNotification('出错', '用户拒绝授予网站访问权限。', 'warning')
      })
  }

  attachMetamask = () => {
    window.addEventListener('load', () => {
      const web3 = window.web3 || undefined

      if (web3) {
        this.openNotification('您好', '已检测到 Metamask 插件', 'info')

        if (!web3.isConnected()) {
          return this.openNotification('出错', '请设置 Metamask 连接一个网络节点', 'warning')
        } else {
          this.checkAccounts(web3)
        }
      } else {
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
      }
    })
  }
  attachFibosClient = () => {
    const { changeFieldValue } = this.props

    const fibos = Fibos({
      chainId: '68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a',
      httpEndpoint: `${network.protocol}://${network.hostport()}`,
    })

    changeFieldValue('fibos', fibos)
  }

  componentDidMount() {
    window.onunload = event => {
      return this.realLeave(event)
    }

    this.attachMetamask()
    this.attachFibosClient()
  }

  render() {
    const { location } = this.props
    const isTransparentMode = location.pathname === '/' || location.pathname === '/index'

    return (
      <div className={isTransparentMode ? styles.mainContainerWithBg : styles.mainContainerWithBg2}>
        <ScreenLarge>
          {matches => {
            return (
              <div className={styles.container}>
                <Row type="flex" justify="center" className={styles.headerRow}>
                  <HomeHeader isTransparentMode={isTransparentMode} />
                </Row>
                <div className={styles.content}>
                  <div className={styles.contentBody}>
                    <Row type="flex" justify="center" className={styles.bodyRow}>
                      <HomeRouter />
                    </Row>
                  </div>
                </div>
                <HomeFooter />
              </div>
            )
          }}
        </ScreenLarge>
      </div>
    )
  }
}

export default customizedConnect('home', actions, withRouter(Home))
