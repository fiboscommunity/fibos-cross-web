import React from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'

import { Loading } from 'Components'

// import styles from './LoadableComponent.module.css'

function LoadableComponent(getPromise, opts, nextProps) {
	return Loadable({
		loader: () => {
			const loaderFuc = () => {
				NProgress.start()
				return getPromise()
					.then(component => {
						NProgress.done()
						return component
					})
					.catch(err => {
						console.log('err', err)
						NProgress.done()
						throw new Error('Component can not be found.')
					})
			}
			return loaderFuc()
		},
		loading: Loading,
		timeout: 10000,
		render(loaded, props) {
			let Component = loaded.default

			return <Component {...props} {...nextProps} />
		},
		...opts
	})
}

export default LoadableComponent
