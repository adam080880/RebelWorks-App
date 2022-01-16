import 'react-native-gesture-handler';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Detail from './src/screens/Movies/Detail';
import List from './src/screens/Movies/List';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import customTheme from './src/utils/RebelWorks.json'

const Stack = createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.dark, ...customTheme}}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name={'Home'} options={{ headerShown: false }} component={Home} />
              <Stack.Screen name={'Detail'} options={{ headerShown: false }} component={Detail} />
              <Stack.Screen name={'List'} options={{ headerShown: false }} component={List} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
