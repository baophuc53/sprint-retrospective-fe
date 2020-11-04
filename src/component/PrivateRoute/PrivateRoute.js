import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('id') !== null
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  export default PrivateRoute;