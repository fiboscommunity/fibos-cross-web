import React, { PureComponent } from 'react'

import Row from 'antd/lib/row'
import 'antd/lib/row/style/css'
import Layout from 'antd/lib/layout'
import 'antd/lib/layout/style/css'

import styles from './Footer.module.css'

import { footerContext } from 'Config'

const { Footer } = Layout

class HomeFooter extends PureComponent {
	render() {
		return (
			<Footer className={styles.footer}>
				<Row type="flex" justify="center">
					<div className={styles.footerDes}>{footerContext}</div>
				</Row>
			</Footer>
		)
	}
}

export default HomeFooter
