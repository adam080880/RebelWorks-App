import { Layout, Text, useTheme } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

export default (props) => {
  const theme = useTheme()

  return (
    <View style={{
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 8,
      overflow: 'hidden',
      paddingHorizontal: 5,
      paddingVertical: 5,
      ...(props.style || {})
    }}>
      <Layout style={{
        backgroundColor: theme['color-info-default'],
        opacity: 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }} />
      <Text category={'c1'} style={{opacity: 1, color: 'cyan'}}>{props.children}</Text>
    </View>
  )
}
