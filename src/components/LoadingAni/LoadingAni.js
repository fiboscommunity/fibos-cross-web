import React, { PureComponent } from 'react'

import styles from './LoadingAni.module.css'

class LoadingAni extends PureComponent {
	constructor(props, context) {
		super(props, context)

		this.state = {
			loaderWidth: 'calc(1em * 7 + 0.15em * 6)',
			loaderHeight: '1.5em',
			spanWidth: '1em'
		}
	}

	componentDidMount() {
		const { spanWidth, spacerWidth, loaderHeight } = this.props

		if (
			!!spanWidth &&
			!!spacerWidth &&
			!!loaderHeight &&
			typeof spanWidth === 'number' &&
			typeof spacerWidth === 'number' &&
			typeof loaderHeight === 'number'
		) {
			this.setState({
				loaderWidth: `calc(${spanWidth}em * 7 + ${spacerWidth}em * 6)`,
				loaderHeight: `${loaderHeight}em`,
				spanWidth: `${spanWidth}em`
			})
		} else {
			console.error('LoadingAni Component property invalid.')
		}
	}

	render() {
		const { loaderWidth, loaderHeight, spanWidth } = this.state
		const { className } = this.props
		
		return (
			<div
				className={!!className ? `${styles.loader} ${className}` : styles.loader}
				style={{ width: loaderWidth, height: loaderHeight }}>
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
				<span style={{ width: spanWidth }} />
			</div>
		)
	}
}

export default LoadingAni

// <LoadingAni loaderHeight={0.5} spacerWidth={0.05} spanWidth={0.15} />
