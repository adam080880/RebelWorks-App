import React from "react";
import {Layout, Spinner, Text, useTheme, withStyles} from '@ui-kitten/components';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {baseContainerStyle, containerStyle} from '../../utils/default';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import CategoryLabel from '../../components/atoms/Text/CategoryLabel';
import TextButton from '../../components/atoms/Text/TextButton';
import SliderItem from '../../components/molecules/Slider/SliderItem';
import Pagination from '../../components/molecules/Slider/Pagination';
import { discoverMovie, discoverTv, nowPlaying } from '../../services/movies';
import { genre, genreTv } from '../../services/genres';
import { movieDbConfigutation } from '../../services/configuration';
import PosterImage from '../../components/atoms/Poster/PosterImage';
import PosterCard from '../../components/molecules/Card/PosterCard';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listLoading: true,
      list: [],
      configuration: {},

      nowPlayingsLoading: true,
      tvShowLoading: true,
      nextLoading: false,
      sliders: [],
      sliderIndex: 0,
      genre: {},
      genreTv: {},
      page: 1
    };
  }

  componentDidMount = () => {
    this.refresh()
  }

  refresh = () => {
    const {type} = this.props.route.params;

    if (type == 'movie') {
      discoverMovie({
        page: 1
      }).then((response) => {
        this.setState({
          listLoading: false,
          list: response.data.results
        })
      })
    } else if (type == 'tv') {
      discoverTv({
        page: 1
      }).then((response) => {
        this.setState({
          listLoading: false,
          list: response.data.results
        })
      })
    }

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
    const {type} = this.props.route.params;

    return this.state.listLoading ? (
      <Layout style={[styles.baseContainer, { alignItems: 'center', justifyContent: 'center' }]}>
        <Spinner size={'giant'} status={'primary'} />
      </Layout>
    ) : (
      <Layout style={[styles.baseContainer]}>
        <Layout style={{height: 50, alignItems: 'center', flexDirection: 'row'}}>
          <Icon style={[styles.container]} name={'chevron-left'} color={'white'} size={20} onPress={() => {
            this.props.navigation.goBack()
          }} />
          <Text>List {type == 'movie' ? 'Movie' : 'TV'}</Text>
        </Layout>
        <FlatList
          data={this.state.list}
          numColumns={2}
          ListFooterComponent={
            <Layout style={[styles.baseContainer, { alignItems: 'center', justifyContent: 'center', marginVertical: 15 }]}>
              <Spinner size={'giant'} status={'primary'} />
            </Layout>
          }
          onEndReached={() => {
            this.setState({
              nextLoading: true
            }, () => {
              if (type == 'movie') {
                discoverMovie({
                  page: this.state.page + 1
                }).then((response) => {
                  this.setState({
                    list: [...this.state.list ,...response.data.results],
                    page: this.state.page + 1,
                    nextLoading: false
                  })
                })
              } else if (type == 'tv') {
                discoverTv({
                  page: this.state.page + 1
                }).then((response) => {
                  this.setState({
                    list: [...this.state.list ,...response.data.results],
                    page: this.state.page + 1,
                    nextLoading: false
                  })
                })
              }
            })
          }}
          renderItem={({item, index}) => {
            return (
              <PosterCard
                onPress={() => {
                  this.props.navigation.navigate('Detail', {
                    id: item.id,
                    configuration: this.state.configuration,
                    item: item,
                    genre: (type == 'tv') ? this.state.genreTv : this.state.genre,
                  });
                }}
                key={index}
                configuration={this.state.configuration}
                title={item.name || item.title}
                genre_ids={item.genre_ids || []}
                rating={(item.vote_average / 10 * 5)}
                poster_path={item.poster_path}
                items={this.state.list}
                genre={(type == 'tv') ? this.state.genreTv : this.state.genre}
                width={(width / 2)}
                marginLess={1}
              />
            )
          }}
        />
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  ...baseContainerStyle(),
  ...containerStyle(),
});

export default withStyles(List)
