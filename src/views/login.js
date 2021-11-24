import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#FEDFD4', position: 'relative'}}>
      <View style={styles.background}>
        <Text style={styles.title}>Tablas</Text>
      </View>
      <View style={styles.background1} />

      <View style={styles.contenedor}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={user => setUser(user)}
            defaultValue={user}
            placeholder="Usuario"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={x => setPassword(x)}
            defaultValue={password}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    bottom: '20%',
    backgroundColor: '#0A100D',
    flex: 2,
    marginHorizontal: 10,
    paddingTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#65010C',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background1: {
    flex: 1,
    backgroundColor: '#FEDFD4',
  },
  title: {
    color: '#FFF',
    fontSize: 40,
    letterSpacing: 4,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  inputs: {
    backgroundColor: '#343A40',
    borderRadius: 10,
  },
  label: {
    marginLeft: 5,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginHorizontal: 50,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#65010C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default LoginScreen;
