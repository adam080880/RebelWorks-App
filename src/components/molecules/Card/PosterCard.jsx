import { Text } from '@ui-kitten/components'
import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PosterImage from "../../atoms/Poster/PosterImage"
import CategoryLabel from '../../atoms/Text/CategoryLabel'
import StarRating from 'react-native-star-rating';

export default (props) => {
  const width = Dimensions.get('window').width;

  return (
    <TouchableOpacity style={{
      width: (160 / 375) * width,
      height: ((160 / 375) * width) * 4 / 3,
      marginRight: 8,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      padding: 10
    }}
    onPress={(props.onPress || (() => {}))}>
      <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
        <PosterImage
          uri={`${props.configuration.base_url}w300${props.poster_path}`}
          width={(160 / 375) * width}
        />
      </View>
      
      <CategoryLabel style={{marginBottom: 8}}>{props.genre_ids.length > 0 ? props.genre[props.genre_ids[0]] : 'No Genre'}</CategoryLabel>
      <StarRating
        disabled={true}
        maxStars={5}
        rating={props.rating}
        fullStarColor={'white'}
        emptyStarColor={'white'}
        halfStarColor={'white'}
        halfStarEnabled={true}
        starStyle={{marginRight: 3}}
        starSize={10}
      />
      <Text category={'h6'} style={{fontWeight: 'normal'}}>{props.title}</Text>
    </TouchableOpacity>
  )
}