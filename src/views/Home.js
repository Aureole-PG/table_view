import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../context/context';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Loading from '../components/Loading';
const mode = ['Nombre', 'Cedula'];
const Item = ({nombre, apellido, cedula, tramite, estado, fecha}) => (
  <View style={[styles.item, estado != 'Activo' ? styles.itemStatus : null]}>
    <View style={styles.ItemContent}>
      <View style={styles.description}>
        <Text style={styles.title}>{tramite}</Text>

        <Text>{`${nombre} ${apellido}`}</Text>
        <Text>{cedula}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{fecha}</Text>
          <Text>{estado}</Text>
        </View>
      </View>
    </View>
  </View>
);
const HomeScreen = ({navigation}) => {
  const {getClients} = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [searchType, setSearchType] = useState(mode[0]);
  const [errorText, setErrorText] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const filterData = () => {
    let res = [];
    if (searchType == 'Nombre') {
      res = data.filter(e => e.nombre_cliente.includes(search.toUpperCase()));
      setFilter(res);
    }
    if (searchType == 'Cedula') {
      res = data.filter(e => e.cliente_cédula.includes(search));
      setFilter(res);
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const renderItem = ({item}) => (
    <Item
      nombre={item.nombre_cliente}
      apellido={item.apellido_cliente}
      tramite={item.TRAMITE}
      fecha={item.FECHA}
      estado={item.estado_proceso}
      navigation={navigation}
      cedula={item.cliente_cédula}
    />
  );
  useEffect(() => {
    if (refreshing) {
      getClients()
        .then(e => {
          setData(e);
          setFilter(e);
          setRefreshing(false);
          setError(false);
        })
        .catch(e => {
          setErrorText(JSON.stringify(e));
          setError(true);
          setRefreshing(false);
        });
    }
  }, [refreshing]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, paddingHorizontal: 25}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.searchInput}>
            <TextInput
              style={styles.inputs}
              onChangeText={x => setSearch(x)}
              defaultValue={search}
            />
          </View>
          <View style={styles.action}>
            <SelectDropdown
              data={mode}
              defaultValueByIndex={0}
              buttonStyle={{
                backgroundColor: '#f8f9fc',
                borderLeftWidth: 0.5,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
              dropdownStyle={{
                borderRadius: 10,
              }}
              onSelect={(selectedItem, index) => {
                setSearchType(selectedItem);
                setFilter(data);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <View style={styles.action}>
          <TouchableOpacity style={styles.button} onPress={filterData}>
            <Text style={{color: '#FFF'}}>buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 4}}>
        {!error ? (
          <>
            {filter.length == 0 ? (
              <View style={styles.action}>
                <Text>No hay datos</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setFilter(data)}>
                  <Text style={{color: '#FFF'}}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filter}
                renderItem={renderItem}
                keyExtractor={(item, id) => id}
              />
            )}
          </>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Text>{errorText}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceef3',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 3,
    borderColor: '#1368AA',
    borderRadius: 5,
  },
  itemStatus: {
    borderColor: '#ab0000',
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
  },
  ItemContent: {
    flexDirection: 'row',
  },
  description: {
    flex: 1,
  },
  action: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#253d53',
    padding: 10,
    borderRadius: 5,
  },
  inputs: {
    backgroundColor: '#f8f9fc',
    borderRadius: 10,
  },

  searchInput: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
