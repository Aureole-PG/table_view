import React, {useContext} from 'react';
import {NavigationContainer, Text} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import LoginScreen from '../views/login';
import HomeScreen from '../views/Home';
import ItemScreen from '../views/Item';
import {AuthContext} from '../context/context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawnerContent} from '../components/DrawerContent';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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
    <Drawer.Navigator drawerContent={props => <DrawnerContent {...props} />}>
      <Drawer.Screen name="Tramites" component={AuthStack} />
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
