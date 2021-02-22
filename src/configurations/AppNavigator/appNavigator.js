import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignUp from '../../auth/SignUp';
import SignUp1 from '../../auth/SignUp';
import Login from '../../auth/Login';
import Login1 from '../../auth/Login';
import Home from '../../screens/Home';
import Home1 from '../../screens/Home1';
import Menu from '../../screens/Menu';
import Cart from '../../screens/Cart';
import MapView from '../../screens/MapView';
import PaymentMethod from '../../screens/PaymentMethod';
import MyOrders from '../../screens/MyOrders';
import ViewOrderDetails from '../../screens/ViewOrderDetails';
import AccountSettings from '../../screens/AccountSettings';
import ChangePassword from '../../screens/ChangePassword';
import RiderDetails from '../../screens/RiderDetails';
import Account from '../../screens/Account';
import ViewCartItem from '../../screens/ViewCartItem';
import ViewCartItem1 from '../../screens/ViewCartItem1';
import Invoice from '../../screens/Invoice';
import Invoice1 from '../../screens/Invoice1';
import CheckOut from '../../screens/CheckOut';
import Splash from '../../screens/Splash';
import OptionsView from '../../components/Dropdown/options';

// import BottomNavigator from '../BottomNavigator';

const AppContainer = createStackNavigator(
  {
    Splash: Splash,
    Home: Home,
    Home1: Home1,
    Menu: Menu,
    Invoice: Invoice,
    Invoice1: Invoice1,
    MapView: MapView,
    CheckOut: CheckOut,

    Account: Account,
    Login: Login,
    ViewCartItem: ViewCartItem,
    ViewCartItem1: ViewCartItem1,

    // Home: BottomNavigator,
    AccountSettings: AccountSettings,
    ChangePassword: ChangePassword,
    MyOrders: MyOrders,
    RiderDetails: RiderDetails,
    ViewOrderDetails: ViewOrderDetails,
    PaymentMethod: PaymentMethod,
    Cart: Cart,

    SignUp: SignUp,
    Options: OptionsView,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppNavigator = createAppContainer(AppContainer);

export default AppNavigator;
