import React from 'react';
import store from "./redux/store"
import { Provider } from 'react-redux';


import HomePage from './pages/Home';
import AddItemPage from './pages/AddItemPage';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShopingListPage from './pages/ShopingListPage';

const Stack = createStackNavigator();


function App() {
  return (
    <Provider store={store} >
       <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Home" component={HomePage}  /> */}
        {/* <Stack.Screen name="AddItem" component={AddItemPage} /> */}
       
        <Stack.Screen name="ShopingList" component={ShopingListPage} />
      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
   
  );
}

export default App;
