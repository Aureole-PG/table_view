import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Card} from '../components/Cards';
const Data = [
  {proceso: 'Donacion', estado: true},
  {proceso: 'Adjudicacion', estado: false},
  {proceso: 'Restauracion', estado: true},
  {proceso: 'Mantelacion', estado: false},
  {proceso: 'Donacion', estado: false},
  {proceso: 'Correccion', estado: true},
  {proceso: 'Reparacion', estado: true},
  {proceso: 'Donacion', estado: true},
];
const ItemScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Cliente</Text>
        <Text style={styles.titleText}>Nombre</Text>
        <Text style={[styles.titleText, {marginLeft: 30}]}>Apellido</Text>
        <View style={styles.clientInfoContainer}>
          <Text>Cedula:</Text>
          <Text>1234567890</Text>
        </View>
        <Text style={styles.titleText}>Tramites</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={{paddingHorizontal: 10}}>
          {Data.map((e, i) => (
            <Card key={i} proceso={e.proceso} estado={e.estado} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    margin: 10,
  },
  bodyContainer: {
    flex: 3,
    backgroundColor: '#ADB5BD',
    paddingVertical: 10,
  },
  titleText: {
    letterSpacing: 4,
    fontSize: 28,
  },
  clientInfoContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ItemScreen;
