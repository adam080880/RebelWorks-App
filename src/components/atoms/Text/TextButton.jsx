import { Text } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity } from 'react-native';


export default (props) => {
  return (
    <TouchableOpacity onPress={props.onPress ? props.onPress : () => {}}>
      <Text category={'s2'} {...props} status={'primary'}>{props.children}</Text>
      {!!(props.icon) && props.icon}
    </TouchableOpacity>
  )
}
