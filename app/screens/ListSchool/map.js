/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {
//   QuickView, Button,
// } from '@components';
import {QuickView, Button} from '../../components';
import MapView, { Callout, Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet, Text, Image} from 'react-native';
// import { Color } from '@themes/Theme';
// import { convertPrice, vndPriceFormat } from '@utils/functions';
// import NavigationService from '@utils/navigation';
// import { lightPrimaryColor } from '@themes/ThemeComponent/Common/Color';

const LATITUDE = 16.06375;
const LONGITUDE = 108.17969;
const coordinates = [
  {
    name: 'Đại học Bách Khoa',
    code: 'DUT',
    address: '54 Nguyễn Lương Bằng',
    latitude: 16.0738064,
    longitude: 108.1477255,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Logo_dhbkdn.jpg',
    price: 550000,
  },
  {
    name: 'Đại học Kinh Tế',
    code: 'DUE',
    address: '71 Ngũ Hành Sơn',
    latitude: 16.0479858,
    longitude: 108.2370301,
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_Kinh_t%E1%BA%BF_%C4%90%C3%A0_N%E1%BA%B5ng.jpg',
    price: 750000,
  },
  {
    name: 'Đại học Sư Phạm',
    code: 'UED',
    address: '459 Tôn Đức Thắng',

    latitude: 16.061839,
    longitude: 108.1570242,
    image: 'https://upload.wikimedia.org/wikipedia/vi/thumb/4/4e/Dai_hoc_Su_pham_Da_Nang.PNG/150px-Dai_hoc_Su_pham_Da_Nang.PNG',
    price: 850000,
  },
  {
    name: 'Đại học Duy Tân',
    code: 'DTU',
    address: '254 Nguyễn Văn Linh',

    latitude: 16.0602096,
    longitude: 108.2105274,
    image: 'https://pbs.twimg.com/profile_images/1211688669/logoDT-png_400x400.png',
    price: 1550000,
  },
  {
    name: 'Đại học Đông á',
    code: 'DAD',
    address: '33 Xô Viết Nghệ Tĩnh',

    latitude: 16.032034,
    longitude: 108.2191138,
    image: 'https://d3av3o1z276gfa.cloudfront.net/images/place/kG7itIy2OB9EbxOW4GvdRnAnGxMDFwN8.jpeg',
    price: 950000,
  },
  {
    name: 'Viện Nghiên cứu và Đào tạo Việt - Anh',
    code: 'VNUK',
    address: '158A Lê Lợi',

    latitude: 16.0710393,
    longitude: 108.2180645,
    image: 'https://tuyensinhvnuk.edu.vn/wp-content/uploads/2019/03/cropped-VNUK-header-2.png',
    price: 950000,
  },
];
// interface Props {}
// interface State {
//   markers: any;
//   propertyIndex: number;
// }
class MapScreen extends Component{
  // carousel: any;

  // map: any;

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      propertyIndex: 0,
    };
  }

  renderCarouselItem = ({ item }) => (
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
          source={{ uri: item?.image }}
          // source={"../../assets/images/avata-02.jpeg"}
         
          sharp
          style={{
            width:102,
            height:102,
            // zIndex: 99,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
      </QuickView>
      {/* <Image
          source={{ uri: item?.image }}
          // source={"../../assets/images/avata-02.jpeg"}
          width={102}
          height={102}
          sharp
          style={{
            width:102,
            height:102,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        /> */}
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
            <Text fontSize={12}>Đánh giá</Text>
            <Text fontSize={12} bold>
              ... sao
            </Text>
          </QuickView>
          <QuickView flex={3} center>
            <Text fontSize={12}>Học phí</Text>
            <Text fontSize={20} bold>
              {item?.price}
            </Text>
          </QuickView>
          {/* <QuickView flex={3} center>
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
          </QuickView> */}
        </QuickView>
      </QuickView>
    </QuickView>
  );

  onCarouselItemChange = (index) => {
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

  onMarkerPressed = (location, index) => {
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
    // markers = this.state.markers;
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
              <Text bold fontSize={20}>{marker.code}</Text>
              </QuickView>
              <Callout>
                <Text>{marker.price}</Text>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <Carousel
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
        />
      </QuickView>

    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);