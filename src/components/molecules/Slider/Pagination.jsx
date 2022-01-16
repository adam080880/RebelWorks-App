import React from 'react';
import {View} from 'react-native';
import {Pagination} from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

export default (props) => {
  return (
    <Pagination
      dotsLength={props.sliders.length}
      activeDotIndex={props.sliderIndex}
      dotColor={'#FFF'}
      inactiveDotColor={'#FFF'}
      renderDots={(activeIndex, total, context) => {
        return [...Array(total).keys()].map((key) => {
          return <TouchableWithoutFeedback
            onPress={() => {
              if (props.onChangeDots instanceof Promise) {
                props.onChangeDots(key)
                  .finally(() => {
                    props.sliderRef.snapToItem(key);
                  })
              } else {
                props.onChangeDots(key)
                props.sliderRef.snapToItem(key);
              }
            }}>
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor:
                  activeIndex == key
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.4)',
                borderRadius: 8 / 2,
                marginHorizontal: 4,
              }}
            />
          </TouchableWithoutFeedback>
        })
      }}
      containerStyle={{
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
      }}
      carouselRef={props.sliderRef}
      tappableDots={!!props.sliderRef}
    />
  )
}
