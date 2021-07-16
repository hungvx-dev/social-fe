import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { makeGetIsAuthenticated, makeGetMe } from '@/modules/auth/store/selector'

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const isAuth = makeGetIsAuthenticated()
  const user = makeGetMe()
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuth) {
          if (!role || role === user.role) return <Component {...props} />
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default PrivateRoute
