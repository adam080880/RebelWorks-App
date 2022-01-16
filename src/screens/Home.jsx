import React from "react";
import {Layout, Spinner, Text, useTheme, withStyles} from '@ui-kitten/components';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {baseContainerStyle, containerStyle} from '../utils/default';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import CategoryLabel from '../components/atoms/Text/CategoryLabel';
import TextButton from '../components/atoms/Text/TextButton';
import SliderItem from '../components/molecules/Slider/SliderItem';
import Pagination from '../components/molecules/Slider/Pagination';
import { discoverTv, nowPlaying } from '../services/movies';
import { genre, genreTv } from '../services/genres';
import { movieDbConfigutation } from '../services/configuration';
import PosterImage from '../components/atoms/Poster/PosterImage';
import PosterCard from '../components/molecules/Card/PosterCard';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nowPlayingsLoading: true,
      tvShowLoading: true,
      sliders: [],
      tvShows: [],
      nowPlayings: [],
      newReleases: [],
      sliderIndex: 0,
      genre: {},
      genreTv: {},
      configuration: {}
    };
  }

  componentDidMount = () => {
    nowPlaying().then((response) => {
      const data = response.data;
      const nowPlayings = data.results || [];

      this.setState({
        sliders: nowPlayings.slice(0, 3),
        sliderIndex: 0,
        nowPlayingsLoading: false,
        nowPlayings,
        newReleases: nowPlayings.slice(0, 5)
      })
    })
    
    discoverTv().then((response) => {
      const data = response.data;
      const discoverTv = data.results || [];

      this.setState({
        tvShows: discoverTv,
        tvShowLoading: false
      })
    })

    genre().then((response) => {
      const data = response.data;
      const genres = data.genres || [];

      this.setState({
        genre: genres.reduce((prev, genre) => {
          prev[genre.id] = genre.name

          return prev
        }, {})
      })
    })

    genreTv().then((response) => {
      const data = response.data;
      const genres = data.genres || [];

      this.setState({
        genreTv: genres.reduce((prev, genre) => {
          prev[genre.id] = genre.name

          return prev
        }, {})
      })
    })

    movieDbConfigutation().then((response) => {
      const data = response.data;
      const configuration = data.images

      this.setState({
        configuration
      })
    })
  }

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const theme = this.props.eva.theme

    return (this.state.nowPlayingsLoading || this.state.tvShowLoading) ? (
      <Layout style={[styles.baseContainer, { alignItems: 'center', justifyContent: 'center' }]}>
        <Spinner size={'giant'} status={'primary'} />
      </Layout>
    ) : (
      <Layout style={[styles.baseContainer, { position: 'relative' }]}>
        <ScrollView nestedScrollEnabled={true}>
          <Layout style={{ height: (280 / 812) * height, position: 'relative' }}>
            {!this.state.nowPlayingsLoading && <>
              <Carousel
                data={this.state.sliders}
                ref={ref => (this.sliderRef = ref)}
                renderItem={SliderItem({
                  genre: this.state.genre,
                  configuration: this.state.configuration,
                  onPress: (item) => {
                    this.props.navigation.navigate('Detail', {
                      id: item.id,
                      configuration: this.state.configuration,
                      item: item,
                      genre: this.state.genre
                    })
                  }
                })}
                slideStyle={{flex: 1}}
                windowSize={width}
                sliderWidth={width}
                itemWidth={width}
                layout={'default'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={0.7}
                loop={true}
                onSnapToItem={index => this.setState({ sliderIndex: index })}
              />

              <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Pagination
                  sliderIndex={this.state.sliderIndex}
                  sliders={this.state.sliders}
                  sliderRef={this.sliderRef}
                  onChangeDots={(sliderIndex) => {
                    this.setState({
                      sliderIndex
                    })
                  }}
                />
              </View>
            </>}
          </Layout>

          <Layout style={{ paddingHorizontal: 15, paddingTop: 20, paddingBottom: 50 }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
              <Text category={'h5'}>New Release</Text>
              <TextButton onPress={() => {
                this.props.navigation.navigate('List', {
                  type: 'movie'
                })
              }} icon={<Icon style={{marginLeft: 5}} size={10} color={theme['color-primary-default']} name={'chevron-right'} />}>
                See All
              </TextButton>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 15}}
            >
              {this.state.newReleases.map((item, index) => <PosterCard
                onPress={() => {
                  this.props.navigation.navigate('Detail', {
                    id: item.id,
                    configuration: this.state.configuration,
                    item: item,
                    genre: this.state.genre
                  });
                }}
                key={index}
                configuration={this.state.configuration}
                title={item.title}
                rating={(item.vote_average / 10 * 5)}
                poster_path={item.poster_path}
                genre_ids={item.genre_ids || []}
                items={this.state.newReleases}
                genre={this.state.genre}
              />)}
            </ScrollView>

            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
              <Text category={'h5'}>TV Show</Text>
              <TextButton onPress={() => {
                this.props.navigation.navigate('List', {
                  type: 'tv'
                })
              }} icon={<Icon style={{marginLeft: 5}} size={10} color={theme['color-primary-default']} name={'chevron-right'} />}>
                See All
              </TextButton>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 15}}
            >
              {this.state.tvShows
                .map((item, index) => <PosterCard
                  onPress={() => {
                    this.props.navigation.navigate('Detail', {
                      id: item.id,
                      configuration: this.state.configuration,
                      item: item,
                      genre: this.state.genreTv,
                    });
                  }}
                  key={index}
                  configuration={this.state.configuration}
                  title={item.name}
                  genre_ids={item.genre_ids || []}
                  rating={(item.vote_average / 10 * 5)}
                  poster_path={item.poster_path}
                  items={this.state.tvShows}
                  genre={this.state.genreTv}
                />
                )}
            </ScrollView>
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

export default withStyles(Home)
