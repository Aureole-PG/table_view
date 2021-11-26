import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const Card = ({proceso, fecha, estado}) => {
  return (
    <View style={[styles.card, estado ? styles.prossesEnd : styles.prossesing]}>
      <Text style={styles.title}>{proceso}</Text>
      <View style={styles.InfoContainer}>
        <Text>Fecha</Text>
        <Text>05/11/2021</Text>
      </View>
      <View style={styles.InfoContainer}>
        <Text>Estado:</Text>
        <Text>{estado ? 'Finalizado' : 'En proceso'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6C757D',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    borderLeftWidth: 6,
  },
  prossesEnd: {
    borderLeftColor: '#a7c957',
  },
  prossesing: {
    borderLeftColor: '#0d47a1',
  },
  prossesFailed: {
    borderLeftColor: '#a7c957',
  },

  title: {
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 18,
  },
  InfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
