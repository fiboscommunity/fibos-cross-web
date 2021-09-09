import React, { PureComponent } from 'react'

import { LoadingAni } from 'Components'

import styles from './Loading.module.css'

class Loading extends PureComponent {
	render() {
		const { error, timedOut, pastDelay, retry } = this.props
		if (error)
			return (
				<div>
					Error! <button onClick={retry}>Retry</button>
				</div>
			)

		if (timedOut)
			return (
				<div>
					Error! <button onClick={retry}>Retry</button>
				</div>
			)

		if (pastDelay)
			return (
				<div className={styles.container}>
					<LoadingAni className={styles.loading} loaderHeight={1} spacerWidth={0.15} spanWidth={1} />
				</div>
			)

		return null
	}
}

export default Loading
