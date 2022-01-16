import 'react-native-gesture-handler';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Detail from './src/screens/Movies/Detail';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const Stack = createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name={'Home'} options={{ headerShown: false }} component={Home} />
              <Stack.Screen name={'Detail'} options={{ headerShown: false }} component={Detail} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
