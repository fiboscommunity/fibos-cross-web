import React, { PureComponent } from 'react'

import styles from './Waiting.module.css'

import waiting from 'Assets/waiting.png'

class Waiting extends PureComponent {
	render() {
		return (
			<div className={styles.container}>
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={waiting} alt="" />
				</div>
				<div className={styles.contextWrapper}>
					<div className={styles.context}>
						<div className={styles.contextRow}>{`敬请期待`}</div>
						<div className={styles.contextRow}>{`…`}</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Waiting
