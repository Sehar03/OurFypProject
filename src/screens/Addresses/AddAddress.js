import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Linking,
  SafeAreaView,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconStyles from '../../assets/Styles/IconStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import {Neomorph} from 'react-native-neomorph-shadows';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../Context/AppContext';
import Geocoder from 'react-native-geocoder';

const AddAddress = ({navigation}) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '70%', '80%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  const {baseUrl, updateCurrentUser, currentUser, selectedScreenForAddress} =
    useContext(AppContext);
  const [streetName, setStreetName] = useState('');
  const [elaqa, setElaqa] = useState('');
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [loading, setLoading] = useState(true);
  const [label, setLabel] = useState('');

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: mLat,
    longitude: mLong,
  });

  const showLocationPermissionAlert = () => {
    Alert.alert(
      'Location Permission Denied',
      'To use this feature, please enable location permissions in your device settings.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            navigation.navigate('Address');
          },
        },
        {
          text: 'Open Settings',
          onPress: () => {
            Linking.openSettings();
            navigation.navigate('Address');
          },
        },
      ],
    );
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    console.log('hey');
    try {
      const addresses = await Geocoder.geocodePosition({
        lat: latitude,
        lng: longitude,
      });
      console.log('address', addresses);

      const formattedAddress = addresses[0]?.formattedAddress || '';
      setAddress(formattedAddress);
      // storeDonorAddress(address);
      if (formattedAddress.length > 0) {
        setLoading(false); // Assuming the loading is done on the first successful attempt
      }
      const locality = addresses[0]?.subAdminArea || '';
      setLocality(locality);
      const streetName = addresses[0]?.streetName || '';
      setStreetName(streetName);
      const elaqa = addresses[0]?.subLocality || '';
      setElaqa(elaqa);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async position => {
            console.log(position);
            setMLat(position.coords.latitude);
            setMLong(position.coords.longitude);
            setMarkerCoordinate({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            console.log(error.code, error.message);
            if (error.code === 2) {
              Alert.alert('Please turn GPS On');
              navigation.goBack();
              // setLoading(false);
            } else if(error.code === 3) {
              // setLoading(false);
              Alert.alert('Network Error,Please try again later');
              navigation.goBack();
              if (selectedScreenForAddress == 'Donor') {
                navigation.navigate('Donor');
              } else {
                navigation.navigate('Address');
              }
            }
          },
        );
      } else {
        console.warn('Location permission denied');
        showLocationPermissionAlert();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const saveAddress = async () => {
    try {
      const formData = new FormData();

      const customerAddress = [
        {
          formattedAddress: address,
          locality: locality,
          elaqa: elaqa,
          streetName: streetName,
          label: label,
          latitude:mLat,
          longitude:mLong
        },
      ];

      formData.append('address', JSON.stringify(customerAddress));
      console.log('id from context', currentUser.userId);
      formData.append('_id', currentUser.userId);

      const response = await fetch(`${baseUrl}/saveAddress`, {
        method: 'post',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        console.log(await response.text());
        return;
      }

      const data = await response.json();
      if (data.message === 'Address saved successfully') {
        updateCurrentUser({
          userId: data.registeredUser._id,
          email: data.registeredUser.email,
          password: data.registeredUser.password,
          name: data.registeredUser.name,
          profileImage: data.registeredUser.profileImage,
          phoneNumber: data.registeredUser.phoneNumber,
          addresses: data.registeredUser.addresses,
        });

        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            userId: data.registeredUser._id,
            email: data.registeredUser.email,
            password: data.registeredUser.password,
            name: data.registeredUser.name,
            profileImage: data.registeredUser.profileImage,
            phoneNumber: data.registeredUser.phoneNumber,
            addresses: data.registeredUser.addresses,
          }),
        );
        navigation.navigate('Address');
      } else {
        console.log('Error in response: ', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: AppColors.white,
            }}>
            <LottieView
              source={require('../../assets/animations/Loading.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            />
            <Text>Loading Address...</Text>
            {console.log('address loading')}
          </View>
        ) : (
          <View>
            <View
              style={{
                height: hp('100%'),
                width: 400,
                backgroundColor: AppColors.black,
              }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: mLat,
                  longitude: mLong,
                  latitudeDelta: 0.215,
                  longitudeDelta: 0.0121,
                }}>
                <Marker
                  draggable
                  coordinate={markerCoordinate}
                  onDragEnd={e => {
                    const {latitude, longitude} = e.nativeEvent.coordinate;
                    setMarkerCoordinate({latitude, longitude});
                    getAddressFromCoordinates(latitude, longitude);
                  }}
                  title="Custom Marker"
                  description="This is a custom marker"></Marker>
              </MapView>
            </View>

            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <ScrollView contentContainerStyle={styles.bottomSheetContent}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: hp('2.3'),
                      color: AppColors.black,
                      marginLeft: wp('4%'),
                    }}>
                    Add a new address
                  </Text>

                  <View style={{flexDirection: 'row', width: wp('100%')}}>
                    <FontAwesome
                      name="home"
                      size={20}
                      color={AppColors.primary}
                      style={[IconStyles.LocationIcon]}
                    />
                    <View style={{width: wp('70'), alignItems: 'flex-start'}}>
                      <Text
                        numberOfLines={4}
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          color: AppColors.black,
                          marginTop: hp('2'),
                          marginLeft: wp('2'),
                        }}>
                        {' '}
                        {address}
                        {/* 750 B Markazi Jamia Masjid Road */}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="edit"
                      size={20}
                      color={AppColors.primary}
                      style={[IconStyles.EditIcons, {marginLeft: wp('5')}]}
                    />
                  </View>
                  <Text style={{marginLeft: wp('12')}}>{locality}</Text>
                  <View style={styles.container}>
                    <FloatingLabelInput
                      label="Street Name/Number"
                      value={streetName}
                      onChangeText={text => {
                        setStreetName(text);
                      }}
                    />
                    {streetName === '' ? (
                      <Text
                        style={{
                          color: AppColors.primary,
                          marginLeft: wp('4%'),
                        }}>
                        Unable to find street name
                      </Text>
                    ) : null}
                    <FloatingLabelInput
                      label="Elaqa"
                      value={elaqa}
                      onChangeText={text => {
                        setElaqa(text);
                      }}
                    />
                    {elaqa === '' ? (
                      <Text
                        style={{
                          color: AppColors.primary,
                          marginLeft: wp('4%'),
                        }}>
                        Unable to find street number
                      </Text>
                    ) : null}
                    {/* Other fields */}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: hp('2.3'),
                      color: AppColors.black,
                      marginLeft: wp('4%'),
                    }}>
                    Add a label
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setLabel('Home');
                      }}>
                      <Neomorph
                        darkShadowColor={AppColors.Gray}
                        lightShadowColor={AppColors.background2}
                        swapShadows // <- change zIndex of each shadow color
                        style={[
                          ContainerStyles.smallCircleNeomorph,
                          {marginLeft: wp('4')},
                        ]}>
                        <Ionicons
                          name="home-outline"
                          size={20}
                          color={AppColors.primary}
                          style={[IconStyles.smallNeomorphIcon]}
                        />
                      </Neomorph>
                      <Text
                        style={{
                          marginLeft: wp('6'),
                          marginTop: hp('1'),
                          color: AppColors.black,
                        }}>
                        Home
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setLabel('Work');
                      }}>
                      <Neomorph
                        darkShadowColor={AppColors.Gray}
                        lightShadowColor={AppColors.background2}
                        swapShadows // <- change zIndex of each shadow color
                        style={[
                          ContainerStyles.smallCircleNeomorph,
                          {marginLeft: wp('6')},
                        ]}>
                        <Fontisto
                          name="laptop"
                          size={20}
                          color={AppColors.primary}
                          style={[IconStyles.smallNeomorphIcon]}
                        />
                      </Neomorph>
                      <Text
                        style={{
                          marginLeft: wp('9'),
                          marginTop: hp('1'),
                          color: AppColors.black,
                        }}>
                        Work
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setLabel('Partner');
                      }}>
                      <Neomorph
                        darkShadowColor={AppColors.Gray}
                        lightShadowColor={AppColors.background2}
                        swapShadows // <- change zIndex of each shadow color
                        style={[
                          ContainerStyles.smallCircleNeomorph,
                          {marginLeft: wp('6')},
                        ]}>
                        <AntDesign
                          name="hearto"
                          size={20}
                          color={AppColors.primary}
                          style={[IconStyles.smallNeomorphIcon]}
                        />
                      </Neomorph>
                      <Text
                        style={{
                          marginLeft: wp('8'),
                          marginTop: hp('1'),
                          color: AppColors.black,
                        }}>
                        Partner
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>

              <View style={{height: hp(10), borderTopWidth: 0.2}}>
                <TouchableOpacity
                  onPress={() => {
                    // Check if onSaveAddress exists in navigation params
                    if (selectedScreenForAddress == 'Donor') {
                      navigation.navigate('Donor', {address: address});
                    } else {
                      saveAddress();
                    }
                    // navigation.navigate('Address');
                  }}>
                  <Neomorph
                    // darkShadowColor={AppColors.primary}
                    lightShadowColor={AppColors.background}
                    // inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={ContainerStyles.touchableOpacityNeomorphContainer2}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text style={[TextStyles.whiteCenteredLable2]}>
                        Save and continue
                      </Text>
                    </View>
                  </Neomorph>
                </TouchableOpacity>
              </View>
            </BottomSheet>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    marginLeft: wp('4%'),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  bottomSheetContent: {
    flexGrow: 1, // Ensure content grows vertically to allow scrolling
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default AddAddress;
