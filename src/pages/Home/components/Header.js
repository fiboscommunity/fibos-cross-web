import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'

import { Mobile } from 'Components'

import Layout from 'antd/lib/layout'
import 'antd/lib/layout/style/css'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import Drawer from 'antd/lib/drawer'
import 'antd/lib/drawer/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'

import styles from './Header.module.css'

import { websiteName, websiteLogo } from 'Config'

const { Header } = Layout

class HomeHeader extends PureComponent {
  static propTypes = {}

  constructor(props, context) {
    super(props, context)

    this.state = {
      current: '/',
      visible: false,
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  _goto = (pathname, state) => {
    this.props.history.push({
      pathname,
      state: { ...state },
    })
  }

  handleClick = event => {
    this.setState({
      current: event.key,
    })
  }

  componentDidMount() {
    const { location } = this.props
    const tmpVal = location.pathname || ''

    this.setState({
      current: tmpVal,
    })
  }

  render() {
    const { isTransparentMode } = this.props

    return (
      <Header className={isTransparentMode ? styles.header_transparent : styles.header}>
        <div className={styles.headerLogoContainer}>
          <div className={styles.headerLogo}>
            <Icon className={styles.logo} component={websiteLogo} />
          </div>
          <div className={styles.headerLogoText}>{websiteName}</div>
        </div>
        <Mobile>
          {matches => {
            if (matches) {
              console.log('this.state', this.state)
              return (
                <div className={styles.headerMenuWrapper}>
                  <div className={styles.dropdownIconWrapper} onClick={this.showDrawer}>
                    <Icon className={styles.dropdownIcon} type="unordered-list" />
                  </div>
                  <Drawer
                    className={styles.dropdown}
                    placement="top"
                    height={184}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}>
                    <Menu
                      className={styles.menu}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                      style={{
                        height: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                      }}>
                      <Menu.Item
                        key="/"
                        onClick={e => {
                          this._goto('/')
                          this.onClose()
                        }}>
                        <div className={styles.headerMenuText}>{`首页`}</div>
                      </Menu.Item>
                      <Menu.Item
                        key="/transfer"
                        onClick={e => {
                          this._goto('/transfer')
                          this.onClose()
                        }}>
                        <div className={styles.headerMenuText}>{`转账`}</div>
                      </Menu.Item>
                      <Menu.Item
                        key="/help"
                        onClick={e => {
                          this._goto('/help')
                          this.onClose()
                        }}>
                        <div className={styles.headerMenuText}>{`帮助`}</div>
                      </Menu.Item>
                    </Menu>
                  </Drawer>
                </div>
              )
            } else {
              return (
                <div className={styles.headerMenuWrapper}>
                  <Menu
                    className={styles.menu}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{
                      height: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                    }}>
                    <Menu.Item
                      key="/"
                      onClick={e => {
                        this._goto('/')
                      }}>
                      <div className={styles.headerMenuText}>{`首页`}</div>
                    </Menu.Item>
                    <Menu.Item
                      key="/transfer"
                      onClick={e => {
                        this._goto('/transfer')
                      }}>
                      <div className={styles.headerMenuText}>{`转账`}</div>
                    </Menu.Item>
                    <Menu.Item
                      key="/help"
                      onClick={e => {
                        window.open(
                          'http://forum.fo/index.php?&app=forums&module=forums&controller=index&forumId=17',
                        )
                      }}>
                      <div className={styles.headerMenuText}>{`帮助`}</div>
                    </Menu.Item>
                  </Menu>
                  {/*<div className={styles.langWrapper}>
										<div className={styles.langText}>{`中文`}</div>
									</div>*/}
                </div>
              )
            }
          }}
        </Mobile>
      </Header>
    )
  }
}

export default withRouter(HomeHeader)
