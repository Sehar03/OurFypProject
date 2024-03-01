import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ProfileHeader from '../../components/headers/ProfileHeader';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconStyles from '../../assets/Styles/IconStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import TextStyles from '../../assets/Styles/TextStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppContext from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import LottieView from 'lottie-react-native';
import BackButtonHeader from '../../components/headers/BackButtonHeader';

const Address = ({ navigation }) => {
  //
  const { currentUser, updateCurrentUser, baseUrl,storeSelectedScreenForAddress } = useContext(AppContext);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const handleDeleteAddress = async (index) => {
    try {
      const updatedUser = { ...currentUser };
      const deletedAddressId = currentUser.addresses[index]._id.toString();
      updatedUser.addresses.splice(index, 1);

      const formData = new FormData();
      formData.append('deletedAddressId', deletedAddressId);
      formData.append('_id', currentUser.userId);

      const response = await fetch(`${baseUrl}/deleteAddress`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        console.log('Address deleted successfully on the backend.');

        // Remove from AsyncStorage
        try {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const updatedAddresses = parsedUser.addresses.filter(
              (address) => address._id !== deletedAddressId
            );

            // Update the user data in AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify({
              ...parsedUser,
              addresses: updatedAddresses,
            }));

            console.log('Address deleted successfully in AsyncStorage.');
            Alert.alert('Address has been deleted');

            // Update the context only when both backend and AsyncStorage are updated
            updateCurrentUser(updatedUser);
          } else {
            console.error('No user data found in AsyncStorage.');
          }
        } catch (asyncStorageError) {
          console.error('AsyncStorage error:', asyncStorageError);
          Alert.alert('Error', 'Failed to update addresses in AsyncStorage.');
        }
      } else {
        console.error('Failed to delete address on the backend.');
        Alert.alert('Error', 'Failed to delete address on the backend.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to delete address. Please try again.');
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        // storeDriverLatitude(info.coords.latitude);
        // storeDriverLongitude(info.coords.longitude);

        setLatitude(info.coords.latitude);
        setLongitude(info.coords.longitude);

        Geocoder.init('AIzaSyB1BMfNjd-6DlS7RUWSzfokIF0XeSMzHzY');
        Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then(json => {
            console.log(json.results[0].formatted_address);
            console.log(json.results[0].address_components[6].long_name);
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => {
        if (error.PERMISSION_DENIED) {
          // const pkg = DeviceInfo.getBundleId();
          Alert.alert(
            'Denied!'
          //   'We are displaying deals available in your area. To show available deals near you, please enable location by\n1. Goto settings\n2. Scroll down to LINCS_APP\n3. Select LINCS_APP and allow Location.\n4. To keep yourself up-to-date  with new deals, Please turn on notification too.',
          //   [
          //     {
          //       text: 'Cancel',
          //       onPress: () => {
          //         setIsSignInError('');
          //         setIsLoading(false);
          //       },
          //       style: 'cancel',
          //     },
          //     {
          //       text: 'Settings',
          //       onPress: () => {
          //         setIsSignInError('');
          //         setIsLoading(false);
          //         if (Platform.OS === 'ios') {
          //           Linking.openURL(`App-Prefs:LOCATION&path=${pkg}`);
          //         } else {
          //           IntentLauncher.startActivity({
          //             action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
          //             data: 'package:' + pkg,
          //           });
          //         }
          //       },
          //     },
          //   ],
          );
        }
      },
    );
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>
        <BackButtonHeader navigation={navigation} item="   Address" />

        {currentUser.addresses.length > 0 ? (
          currentUser.addresses.map((address, index) => (
            <View
              key={index}
              style={{
                borderBottomWidth: wp('0.5'),
                borderColor: AppColors.background2,
              }}>
              <View style={{ flexDirection: 'row', width: wp('100%')}}>
                <View style={{justifyContent:"space-between",flex:1}}>
                {address.label === "Work" ? (<Fontisto
                  name="laptop"
                  size={20}
                  color={AppColors.primary}
                  style={[IconStyles.LocationIcon]}
                />) : address.label === "Partner" ? (<AntDesign
                  name="hearto"
                  size={20}
                  color={AppColors.primary}
                  style={[IconStyles.LocationIcon]}
                />) : <Ionicons
                  name="home-outline"
                  size={20}
                  color={AppColors.primary}
                  style={[IconStyles.LocationIcon]}
                />
                }
                </View>
                <View style={{ width: wp('77'), alignItems: 'flex-start'}}>
                  <Text
                    numberOfLines={5}
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: AppColors.black,
                      marginTop: hp('1.5'),
                      marginLeft: wp('1.8'),
                     
                    }}>
                    {address.formattedAddress}
                  </Text>
                </View>
                <TouchableOpacity>
                  {/* <MaterialIcons
                  name="edit"
                  size={20}
                  color={AppColors.primary}
                  style={[IconStyles.EditIcons]}
                /> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteAddress(index)}>
                  <FontAwesome
                    name="trash"
                    size={20}
                    color={AppColors.primary}
                    style={[IconStyles.Trash]}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ marginLeft: wp('14'), marginBottom:hp('2') }}>{address.locality} </Text>
             
            </View>
          ))
        ) : (
          <View style={[ContainerStyles.centerView,{marginTop:hp('25')}]}>
          <LottieView
            source={require('../../assets/animations/Location.json')}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text style={{fontSize:wp('3')}}>No Address Found</Text>
        </View>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          storeSelectedScreenForAddress('Address');
          navigation.navigate('AddAddress');
        }}>
        <Neomorph
          lightShadowColor={AppColors.background}
          swapShadows
          style={ContainerStyles.touchableOpacityNeomorphContainer2}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[TextStyles.whiteCenteredLable2]}>
              Add new Address
            </Text>
          </View>
        </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Address;
