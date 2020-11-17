import { Route } from 'react-router';
import {Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('token') !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  export default PrivateRoute;