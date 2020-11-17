import { Route } from 'react-router';
import { Switch, Redirect } from 'react-router-dom'
import './App.css';
import HomeLayout from './component/HomeLayout/HomeLayout';
import BoardPage from './component/BoardPage/BoardPage';
import Sidebar from './component/Sidebar/Sidebar';
import LoginPage from './component/LoginPage/LoginPage';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import RegisterPage from './component/RegisterPage/RegisterPage';
import InfoPage from './component/InfoPage/InfoPage';
import ChangePassPage from './component/ChangePassPage/ChangePassPage';

function App() {
  return (
    <>
    <Sidebar/>
    <Switch>
        <PrivateRoute path='/home' component={HomeLayout}/>
        <PrivateRoute path="/info" component={InfoPage}/>
        <PrivateRoute path="/change-pass" component={ChangePassPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <PrivateRoute path="/share-board/:shareToken" component={BoardPage}/>
        <PrivateRoute path="/board/:id" component={BoardPage}/>
        <Redirect from="/" to="/home" />
    </Switch>
    </>
  );
}

export default App;
