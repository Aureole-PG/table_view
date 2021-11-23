import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
const LoginScreen = () => {
  const [text, setText] = useState('');
  return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#902923'}}>
      <View style={styles.titleContainer}>
        <Text>Loginsadas UwU</Text>
      </View>
      <View style={styles.contenedor}>
        <View style={styles.inputContainer}>
          <Text>Usurio</Text>
          <TextInput
            style={styles.inputs}
            onChangeText={user => setText(user)}
            defaultValue={text}
            placeholder="Usuario"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#0A100D',
    flex: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  inputs: {
    borderColor: '#902923',
    borderBottomWidth: 1,
  },
});

export default LoginScreen;
