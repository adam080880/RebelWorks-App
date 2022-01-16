import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export default (props) => {
  return (
    <View style={{height: props.width * (4 / 3), width: props.width, ...(props.style || {})}}>
      <FastImage source={{
          uri: props.uri,
          priority: 'normal'
        }}
        style={{width: '100%', height: '100%'}}
      />
      <LinearGradient style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']} />
    </View>
  )
}
