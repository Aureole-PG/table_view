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
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import moment from 'moment/min/moment-with-locales';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateRangePicker from 'react-native-daterange-picker';
moment.locale('es');
const mode = ['Nombre', 'Cedula', 'Estado', 'Fecha'];
const state = ['No iniciado', 'En proceso', 'Finalizado'];
const color = {
  'NO INICIADO': '#90be6d',
  'EN PROCESO': '#f9c74f',
  FINALIZADO: '#f94144',
};
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const Item = ({nombre, apellido, cedula, tramite, estado, fecha}) => (
  <View style={[styles.item, {borderLeftColor: color[estado.toUpperCase()]}]}>
    <View style={styles.ItemContent}>
      <View style={styles.description}>
        <Text style={styles.title}>{tramite}</Text>

        <Text>{`${nombre} ${apellido}`}</Text>
        <Text>{cedula}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{fecha}</Text>
          <Text>{estado.toUpperCase()}</Text>
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
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dates, setDatess] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment(),
  });
  const {startDate, endDate, displayedDate} = dates;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const setDates = newdate => {
    setDatess({...dates, ...newdate});
    // console.log(new)
    if (newdate.endDate != null || newdate.endDate != undefined) {
      setShow(false);
    }
  };
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
    if (searchType == 'Estado') {
      res = data.filter(e =>
        e.estado_proceso.toLowerCase().includes(search.toLowerCase()),
      );
      setFilter(res);
    }
    if (searchType == 'Fecha') {
      res = data.filter(
        e =>
          moment(e.FECHA) >= moment(startDate) &&
          moment(e.FECHA) <= moment(endDate),
      );
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
      fecha={moment(item.FECHA).format('LL')}
      estado={item.estado_proceso}
      navigation={navigation}
      cedula={item.cliente_cédula}
    />
  );
  useEffect(() => {
    if (refreshing) {
      getClients()
        .then(e => {
          const newData = e.data.map(d => {
            d.nombre_cliente = d.nombre_cliente.toUpperCase();
            d.apellido_cliente = d.apellido_cliente.toUpperCase();
            return d;
          });
          setData(newData);
          setFilter(newData);
          setError(false);
        })
        .catch(e => {
          setErrorText(JSON.stringify(e));
          setError(true);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }
  }, [refreshing]);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={{flex: 1, paddingHorizontal: 25}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.searchInput}>
              {searchType == 'Estado' && (
                <SelectDropdown
                  data={state}
                  // defaultValueByIndex={0}
                  buttonStyle={{
                    width: 'auto',
                    backgroundColor: '#f8f9fc',
                    borderLeftWidth: 0.5,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                  defaultButtonText={'Selecciona una opción'}
                  dropdownStyle={{
                    borderRadius: 10,
                  }}
                  onSelect={(selectedItem, index) => {
                    setSearch(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              )}
              {(searchType == 'Cedula' || searchType == 'Nombre') && (
                <TextInput
                  style={styles.inputs}
                  onChangeText={x => setSearch(x)}
                  defaultValue={search}
                  keyboardType={searchType == 'Cedula' ? 'numeric' : 'default'}
                  maxLength={searchType == 'Cedula' ? 10 : 20}
                />
              )}
              {searchType == 'Fecha' && (
                <>
                  <TouchableOpacity
                    style={[
                      styles.inputs,
                      {paddingVertical: 15, paddingHorizontal: 10},
                    ]}
                    onPress={() => setShow(true)}>
                    <Text>{`del ${moment(startDate).format(
                      'Do MMM',
                    )} al ${moment(endDate).format('Do MMM')}`}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.action}>
              <SelectDropdown
                data={mode}
                defaultValueByIndex={0}
                buttonStyle={{
                  width: 100,
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
                  setSearch('');
                  setFilter(data);
                  setShow(false);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </View>
          <View style={styles.action}>
            <TouchableOpacity style={styles.buttonB} onPress={filterData}>
              <Text
                style={{
                  color: '#FFF',
                  marginHorizontal: 30,
                  marginVertical: 10,
                }}>
                buscar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 4}}>
          {!error ? (
            <>
              {filter.length == 0 ? (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }>
                  <View style={styles.action}>
                    <Text>No hay datos</Text>
                  </View>
                </ScrollView>
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
        {show && (
          <View
            onPress={() => console.log('sdasd')}
            style={{
              position: 'absolute',
            }}>
            <DateRangePicker
              open={show}
              onChange={setDates}
              endDate={endDate}
              startDate={startDate}
              displayedDate={displayedDate}
              range>
              <Text> </Text>
            </DateRangePicker>
          </View>
        )}
      </View>
    </DismissKeyboard>
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
  buttonB: {
    backgroundColor: '#253d53',
    borderRadius: 5,
  },
  inputs: {
    backgroundColor: '#f8f9fc',
    borderRadius: 10,
  },

  searchInput: {
    flex: 3,
    justifyContent: 'center',
  },
});

export default HomeScreen;
