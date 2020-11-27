/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import {
//   QuickView, Button,
// } from '@components';
import {QuickView, Button} from '../../components';
import MapView, { Callout, Marker } from 'react-native-maps';
// import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet, Text, Image} from 'react-native';
// import { Color } from '@themes/Theme';
// import { convertPrice, vndPriceFormat } from '@utils/functions';
// import NavigationService from '@utils/navigation';
// import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';

const LATITUDE = 16.06375;
const LONGITUDE = 108.17969;
const coordinates = [
  {
    name: 'Burger',
    latitude: LATITUDE,
    longitude: LONGITUDE,
    image: 'https://picsum.photos/500/500',
    price: 550000,
  },
  {
    name: 'Pizza',
    latitude: LATITUDE + 0.004,
    longitude: LONGITUDE - 0.003,
    image: 'https://picsum.photos/500/500',
    price: 750000,
  },
  {
    name: 'Soup',
    latitude: LATITUDE + 0.002,
    longitude: LONGITUDE - 0.006,
    image: 'https://picsum.photos/500/500',
    price: 850000,
  },
  {
    name: 'Sushi',
    latitude: LATITUDE - 0.004,
    longitude: LONGITUDE - 0.004,
    image: 'https://picsum.photos/500/500',
    price: 1550000,
  },
  {
    name: 'Curry',
    latitude: LATITUDE - 0.008,
    longitude: LONGITUDE - 0.004,
    image: 'https://picsum.photos/500/500',
    price: 950000,
  },
];
interface Props {}
interface State {
  markers: any;
  propertyIndex: number;
}
class MapScreen extends PureComponent<Props, State> {
  carousel: any;

  map: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      markers: [],
      propertyIndex: 0,
    };
  }

  renderCarouselItem = ({ item }: { item: any}) => (
    // <QuickView style={{
    //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
    //   height: 150,
    //   width: 300,
    //   padding: 24,
    //   borderRadius: 24,
    // }}
    // >
    //   <Text style={{
    //     color: 'white',
    //     fontSize: 22,
    //     alignSelf: 'center',
    //   }}
    //   >
    //     {item.name}

    //   </Text>
    //   <Image
    //     style={{
    //       height: 120,
    //       width: 300,
    //       bottom: 0,
    //       position: 'absolute',
    //       borderBottomLeftRadius: 24,
    //       borderBottomRightRadius: 24,
    //     }}
    //     source={{ uri: item.image }}
    //   />
    // </QuickView>

    <QuickView
      key={item?.id}
      row
      marginTop={30}
      backgroundColor="#FFFFFF"
      borderRadius={10}
      style={{
        shadowColor: 'rgba(0,0,0,0.4)',
        shadowOffset: {
          width: 3,
          height: 7,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 2.5,
      }}
    >
      <QuickView width={102}>
        <Image
          width={102}
          height={102}
          sharp
          style={{
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          source={{ uri: item?.image }}
        />
      </QuickView>
      <QuickView flex={7} height={102}>
        <QuickView marginHorizontal={20} marginTop={10}>
          <Text numberOfLines={1} fontSize={16} bold>
            {item?.name}
          </Text>
          <Text fontSize={10} numberOfLines={1} marginTop={5}>
            {item?.address}
          </Text>
        </QuickView>
        <QuickView
          row
          backgroundColor="#E6E9F0"
          borderBottomRightRadius={10}
          borderTopRightRadius={10}
          marginLeft={0}
          marginTop={10}
          height={46}
        >
          <QuickView flex={3} center>
            <Text fontSize={12}>Số lượng</Text>
            <Text fontSize={12} bold>
              {item?.sectionCount}
            </Text>
          </QuickView>
          <QuickView flex={3} center>
            <Text fontSize={12}>Giá</Text>
            <Text fontSize={20} bold>
              BKĐN
            </Text>
          </QuickView>
          <QuickView flex={3} center>
            <Button
              onPress={() => {}}
              clear
              title="Xem thêm"
              height={30}
              titleStyle={{
                fontSize: 12,
                fontWeight: 'bold',
              }}
              titlePaddingVertical={0}
            />
          </QuickView>
        </QuickView>
      </QuickView>
    </QuickView>
  );

  onCarouselItemChange = (index: number) => {
    const { markers } = this.state;
    this.setState({ propertyIndex: index });
    const location = coordinates[index];

    this.map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });

    markers[index].showCallout();
  };

  onMarkerPressed = (location: any, index: number) => {
    this.map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });
    this.carousel.snapToItem(index);
  };

  render() {
    const { markers, propertyIndex } = this.state;
    return (

      <QuickView style={{ ...StyleSheet.absoluteFillObject }}>
        {/* <Header title="Bản đồ" backIcon /> */}
        <MapView
          ref={(map) => { this.map = map; }}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {coordinates.map((marker, index) => (
            <Marker
              style={{ borderWidth: 1 }}
              key={marker.name}
              ref={(ref) => { markers[index] = ref; }}
              onPress={() => this.onMarkerPressed(marker, index)}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            >
              <QuickView
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,

                  elevation: 10,
                }}
                padding={7}
                borderRadius={20}
                // backgroundColor={propertyIndex === index ? lightPrimaryColor : Color.white}
              >
                {/* <Text bold color={propertyIndex === index ? Color.white : lightPrimaryColor}>{`${convertPrice(marker.price, ',')} ₫`}</Text> */}
                <Text>BKĐN</Text>
              </QuickView>
              {/* <Callout>
                <Text>{marker.price}</Text>
              </Callout> */}
            </Marker>
          ))}
        </MapView>
        {/* <Carousel
          ref={(c) => {
            this.carousel = c;
          }}
          data={coordinates}
          containerCustomStyle={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 48,
          }}
          renderItem={this.renderCarouselItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 40}
          removeClippedSubviews={false}
          onSnapToItem={(index) => this.onCarouselItemChange(index)}
        /> */}
      </QuickView>

    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);