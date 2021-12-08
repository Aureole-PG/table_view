import React, {useContext} from 'react';
import {AuthContext} from '../context/context';
import {View, Text, StyleSheet, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

export const DrawnerContent = props => {
  const {user, logOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView>
      <View style={styles.titleContiner}>
        <Image
          source={require('../../assets/logo.png')}
          resizeMode={'center'}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.nombre}>{`${user.nombre} ${user.apellido}`}</Text>
          <Text style={styles.subData}>{user.email} </Text>
          <Text style={styles.subData}>{user.cedula} </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Salir" onPress={logOut} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  titleContiner: {
    // flex: 1,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    letterSpacing: 10,
    fontSize: 30,
  },
  infoContainer: {
    borderTopWidth: 2,
    borderTopColor: '#253d53',
    marginHorizontal: 10,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  subData: {
    marginLeft: 5,
    color: '#B4B7BF',
  },
});
