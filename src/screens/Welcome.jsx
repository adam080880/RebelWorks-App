import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {baseContainerStyle, containerStyle, margin} from '../utils/default';

export default class Welcome extends React.Component {
  render() {
    return (
      <Layout style={[styles.baseContainer]}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text category={'h1'} style={styles.text}>
            Hello World
          </Text>
          <Text category={'p1'} style={styles.text} status={'info'}>
            Hi, People 🙌
          </Text>
        </ScrollView>
      </Layout>
    );
  }
}

const styles: any = StyleSheet.create({
  ...baseContainerStyle(),
  ...containerStyle(),
  text: {
    marginBottom: margin.vertical,
  },
});
