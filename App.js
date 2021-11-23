/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import RouterCompoent from './src/Navigation/Routes';
import AuthProvider from './src/context/context';

const App = () => {
  return (
    <AuthProvider>
      <RouterCompoent />
    </AuthProvider>
  );
};

export default App;
