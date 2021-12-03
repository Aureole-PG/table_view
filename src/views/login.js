import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/context';
const LoginScreen = () => {
  const [email, setEmail] = useState('danylove9569@hotmail.com');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    console.log('submit');
    login(email, password).catch(() => {
      setLoading(false);
    });
  };
  if (loading) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#212529', position: 'relative'}}>
      <View style={styles.background}>
        <Text style={styles.title}>Consorcio</Text>
      </View>
      <View style={styles.background1} />

      <View style={styles.contenedor}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={user => setEmail(user)}
            defaultValue={email}
            keyboardType="email-address"
            placeholder="email@email.com"
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
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={{color: '#FFF'}}>Login</Text>
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
    backgroundColor: '#e5e6e9',
    flex: 2,
    marginHorizontal: 10,
    paddingTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    backgroundColor: '#033270',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background1: {
    flex: 1,
    backgroundColor: '#212529',
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
    backgroundColor: '#f8f9fc',
    borderRadius: 10,
  },
  label: {
    marginLeft: 5,
    fontStyle: 'italic',
    color: '#000',
  },
  buttonContainer: {
    marginHorizontal: 50,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#253d53',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default LoginScreen;
