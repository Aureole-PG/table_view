import React, {useState, useContext} from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {AuthContext} from '../context/context';
const CustomModal = ({modalVisible, setModal}) => {
  const {newAddress, address} = useContext(AuthContext);
  const [addressText, setAddressText] = useState(address);
  const submit = () => {
    newAddress(addressText);
    setModal(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModal(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Ingrese Direccion IP</Text>
          <Text>{address}</Text>
          <View>
            <TextInput
              style={styles.inputs}
              onChangeText={setAddressText}
              defaultValue={addressText}
              placeholder="https://192.168.100.177:8080"
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={submit}>
              <Text style={styles.textButton}>aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 22,
    backgroundColor: '#00000082',
  },
  modalView: {
    margin: 30,
    backgroundColor: '#e5e6e9',
    borderRadius: 20,
    padding: 10,
    // alignItems: 'center',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#253d53',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  inputs: {
    backgroundColor: '#f8f9fc',
    borderRadius: 10,
    marginVertical: 10,
  },
  textButton: {
    color: '#FFF',
  },
});

export default CustomModal;
