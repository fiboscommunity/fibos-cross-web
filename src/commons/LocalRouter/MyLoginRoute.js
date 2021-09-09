import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

class MyLoginRoute extends Component {
    static propTypes = {
        content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
        component: PropTypes.func,
        render: PropTypes.func,
        children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    }

    constructor(props, context) {
        super(props, context)

        this.state = {}
    }

    render() {
        if (true) {
            return (
                <Redirect
                    to={{
                        pathname: '/'
                    }}
                />
            )
        }

        return <Route {...this.props} />
    }
}

MyLoginRoute.contextTypes = {
    getGlobalConfig: PropTypes.func
}

export default MyLoginRoute
