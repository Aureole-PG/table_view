import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Third Item',
  },
];
const Item = ({navigation, title}) => (
  <View style={styles.item}>
    <View style={styles.ItemContent}>
      <View style={styles.description}>
        <Text style={styles.title}>{title}</Text>
        <Text>lorem impsusadasdjasdljkjnñasdasdasdasd</Text>
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Datos')}>
          <Text>ver</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
const HomeScreen = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item title={item.title} navigation={navigation} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <Text>Home</Text>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    paddingLeft: 20,
    paddingVertical: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 3,
    borderColor: '#1368AA',
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
  },
  ItemContent: {
    flexDirection: 'row',
  },
  description: {
    flex: 3,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#65010C',
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
