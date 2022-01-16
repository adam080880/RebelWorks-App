import { Text } from '@ui-kitten/components';
import React from 'react';
import { TouchableOpacity } from 'react-native';


export default (props) => {
  return (
    <TouchableOpacity onPress={props.onPress ? props.onPress : () => {}} style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text category={'s2'} {...props} status={'primary'}>{props.children}</Text>
      {props.icon && props.icon}
    </TouchableOpacity>
  )
}
