import React, {useContext} from 'react';
import {NavigationContainer, Text} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import LoginScreen from '../views/login';
import HomeScreen from '../views/Home';
import ItemScreen from '../views/Item';
import {AuthContext} from '../context/context';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const CustomDrawerContent = props => {
  const {logOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <Text>asdsad</Text> */}
      <DrawerItem label="Salir" onPress={logOut} />
    </DrawerContentScrollView>
  );
};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="General"
        options={{
          headerShown: false,
          // animationTypeForReplace: user.logged ? 'pop' : 'push',
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Datos"
        options={{
          headerShown: false,
          // animationTypeForReplace: user.logged ? 'pop' : 'push',
        }}
        component={ItemScreen}
      />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Stack.Navigator>
  );
};
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="List" component={AuthStack} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
    </Drawer.Navigator>
  );
};
const RouterComponent = () => {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.logged ? (
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
              // animationTypeForReplace: user.logged ? 'pop' : 'push',
            }}
            component={MyDrawer}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
              // animationTypeForReplace: user.logged ? 'pop' : 'push',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RouterComponent;
