import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {baseContainerStyle, containerStyle} from '../../../utils/default';
import CategoryLabel from '../../../components/atoms/Text/CategoryLabel';
import RebelWorks from '../../../assets/RebelWorks.png';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

export default (data) => ({item = {}, index = 0}, parallaxProps) => {
  const height = Dimensions.get('window').height;
  const baseUrl = data.configuration.base_url;

  return (
    <Layout
      key={index}
      style={[
        {
          minHeight: (280 / 812) * height,
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        },
      ]}
      level={'4'}>
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <View style={{
          flex: 1,
          overflow: 'hidden'
        }}>
          <LinearGradient style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 3}} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']} />
          <FastImage
            style={{ width: '100%', position: 'absolute', aspectRatio: 1, zIndex: -1 }}
            source={{
                uri: `${baseUrl}w300${item.poster_path}`,
                priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </View>
      <View style={[styles.container, {
        justifyContent: 'center',
        alignItems: 'flex-start',
      }]}>
        <Image source={RebelWorks} style={{marginBottom: ((34 / 812) * height), width: 32}} />
          {!!data.genre &&
            <CategoryLabel style={{marginBottom: ((10 / 812) * height)}}>{item.genre_ids ? data.genre[item.genre_ids[0]] : ''}</CategoryLabel>
          }
        <Text category={'h4'} style={{marginBottom: ((15 / 812) * height)}}>
          {item.title}
        </Text>
        <Button size={'medium'} appearance={'outline'} style={{borderRadius: 250}} onPress={data.onPress ? () => data.onPress(item) : () => {}}>
          Watch Now
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  ...baseContainerStyle(),
  ...containerStyle(),
});
