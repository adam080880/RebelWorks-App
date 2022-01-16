import React from "react";
import { Divider, Layout, Spinner, Text } from '@ui-kitten/components';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { baseContainerStyle, containerStyle } from '../../utils/default';
import CategoryLabel from '../../components/atoms/Text/CategoryLabel';
import FastImage from "react-native-fast-image";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import StarRating from 'react-native-star-rating';
import { credits, similar, tvCredits, tvSimilar } from "../../services/movies";
import TextButton from "../../components/atoms/Text/TextButton";
import PosterCard from "../../components/molecules/Card/PosterCard";

export default class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPlayingsLoading: true,
      sliders: [],
      tvShows: [],
      nowPlayings: [],
      newReleases: [],
      sliderIndex: 0,
      genre: {},
      genreTv: {},
      configuration: {},
      casts: [],
      more: false,
      similar: [],
      similarLoading: true
    };

    this.id = this.props.route.params.id
  }

  componentDidMount = () => {
    this.refresh()
  }

  componentDidUpdate = () => {
    const {item} = this.props.route.params;

    if (item.id !== this.id) {
      this.id = item.id

      this.refresh()
    }
  }

  refresh = () => {
    const {item} = this.props.route.params;

    if (item.name) {
      // if tv
      tvCredits(item.id).then((response) => {
        const data = response.data
        this.setState({
          casts: data.cast,
          more: false
        })
      })

      tvSimilar(item.id).then((response) => {
        const data = response.data

        this.setState({
          similar: data.results,
          similarLoading: false
        })
      })
    } else if (item.title) {
      // if movie
      credits(item.id).then((response) => {
        const data = response.data

        this.setState({
          casts: data.cast,
          more: false
        })
      })

      similar(item.id).then((response) => {
        const data = response.data

        this.setState({
          similar: data.results,
          similarLoading: false
        })
      })
    }
  }

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const {configuration, item, genre} = this.props.route.params;
    const {base_url: baseUrl = ''} = configuration;

    return (
      <Layout style={[styles.baseContainer, { position: 'relative' }]}>
        <ScrollView nestedScrollEnabled={true}>
          <Layout style={{ height: (280 / 812) * height, position: 'relative' }}>
            <Layout
              style={[
                {
                  minHeight: (280 / 812) * height,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end'
                },
              ]}
              level={'4'}>
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                <View style={{
                  flex: 1,
                  overflow: 'hidden'
                }}>
                  <FastImage
                    style={{ width: '100%', position: 'absolute', aspectRatio: 1 }}
                    source={{
                      uri: `${baseUrl}w300${item.poster_path}`,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
                <LinearGradient style={{flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']} />
              </View>
              <View style={[styles.container, {
                justifyContent: 'center',
                alignItems: 'flex-start',
              }]}>
                {!!genre &&
                  <CategoryLabel style={{ marginBottom: 12 }}>{item.genre_ids ? (genre[item.genre_ids[0]] || 'No Genre') : 'No Genre'}</CategoryLabel>
                }
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={item.vote_average / 10 * 5}
                    fullStarColor={'white'}
                    emptyStarColor={'white'}
                    halfStarColor={'white'}
                    halfStarEnabled={true}
                    starStyle={{marginRight: 5}}
                    starSize={10}
                  />

                  <View style={{width: 4, height: 4, backgroundColor: 'white', borderRadius: 4/2, marginRight: 5}} />

                  <Text category={'c1'}>Release Year : {moment(item.release_date || item.first_air_date, 'YYYY-MM-DD').format('YYYY')}</Text>
                </View>
                <Text category={'h5'} style={{ marginBottom: 15 }}>
                  {item.title || item.name}
                </Text>
              </View>
            </Layout>
          </Layout>

          <Layout style={{ paddingHorizontal: 15, paddingTop: 20 }}>
            <Text category={'h5'} style={{marginBottom: 15}}>Synopsis</Text>
            <Layout level={'2'} style={{padding: 15, marginBottom: 15}}>
              <Text category={'p1'}>
                {item.overview}
              </Text>
            </Layout>

            <Text category={'p1'}>
              Cast : <Text style={{fontWeight: 'bold'}}>{this.state.casts.map((cast) => cast.name).slice(0, this.state.more ? this.state.casts.length : 3).join(', ')}
                &nbsp;&nbsp;<Text onPress={() => {
                  this.setState({
                    more: !this.state.more
                  })
                }} style={{fontWeight: 'bold'}} status={'primary'}>{this.state.more ? 'Less' : 'More'}</Text>
              </Text>
            </Text>
          </Layout>

          <Divider style={{marginVertical: 20}} />

          {item.name && <>
            <Layout style={{ paddingHorizontal: 15 }}>

            </Layout>

            <Divider style={{marginVertical: 20}} />
          </>}

          <Layout style={{ paddingHorizontal: 15 }}>
            <Text category={'h5'}>You Might Also Like This</Text>

            {this.state.similarLoading && <View style={{alignItems: 'center', justifyContent: 'center', marginVertical: 15}}><Spinner style={{alignSelf: 'center'}} /></View>}
            {!this.state.similarLoading && <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginVertical: 15}}
            >
              {this.state.similar.map((item, index) => <PosterCard
                onPress={() => {
                  this.setState({
                    similar: [],
                    similarLoading: true
                  }, () => {
                    this.props.navigation.navigate('Detail', {
                      id: item.id,
                      configuration,
                      item,
                      genre
                    });
                  })
                }}
                key={index}
                configuration={configuration}
                title={item.title || item.name}
                rating={(item.vote_average / 10 * 5)}
                poster_path={item.poster_path}
                genre_ids={item.genre_ids || []}
                items={this.state.similar}
                genre={genre}
              />)}
            </ScrollView>}
          </Layout>
        </ScrollView>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  ...baseContainerStyle(),
  ...containerStyle(),
});
