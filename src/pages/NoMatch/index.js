import React, { PureComponent } from 'react'

import styles from './NoMatch.module.css'

import noMatch from 'Assets/noMatch.png'

class NoMatch extends PureComponent {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={noMatch} alt="" />
				</div>
				<div className={styles.contextWrapper}>
					<div className={styles.context}>
						<div className={styles.contextRow}>{`404`}</div>
						<div className={styles.contextRowTip}>{`哎呀,页面走丢了!`}</div>
					</div>
				</div>
			</div>
		)
	}
}

export default NoMatch
