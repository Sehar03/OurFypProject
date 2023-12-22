import React, {useContext, useState} from 'react';
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
import {Neomorph} from 'react-native-neomorph-shadows';
import TextStyles from '../../assets/Styles/TextStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppContext from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Address = ({navigation}) => {
  const {currentUser, updateCurrentUser, baseUrl} = useContext(AppContext);
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
  
  
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <ScrollView>
        <ProfileHeader navigation={navigation} item="Address" />

        {currentUser.addresses.length > 0 ? (
          currentUser.addresses.map((address, index) => (
            <View
              key={index}
              style={{
                borderBottomWidth: wp('0.4'),
                borderColor: AppColors.background2,
              }}>
              <View style={{flexDirection: 'row', width: wp('100%')}}>
                {/* <View style={{marginLeft:wp('3'),marginRight:wp('3')}}> */}
                {address.label==="Work" ?( <Fontisto
                name="laptop"
                size={20}
                color={AppColors.primary}
                style={[IconStyles.LocationIcon]}
              />):address.label==="Partner"?  (<AntDesign
              name="hearto"
              size={20}
              color={AppColors.primary}
              style={[IconStyles.LocationIcon]}
            />):<FontAwesome
            name="home"
            size={20}
            color={AppColors.primary}
            style={[IconStyles.LocationIcon]}
          />}
               {/* </View> */}
                <View style={{width: wp('77'), alignItems: 'flex-start'}}>
                  <Text
                    numberOfLines={5}
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: AppColors.black,
                      marginTop: hp('2'),
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
              <Text style={{marginLeft: wp('12')}}>{address.locality} </Text>
              {/*  */}
            </View>
          ))
        ) : (
          <View
            style={{
              borderBottomWidth: wp('0.4'),
              borderColor: AppColors.background2,
              alignItems: 'center',
              paddingVertical: hp('2'),
            }}>
            <Text
              style={{fontFamily: 'Poppins-SemiBold', color: AppColors.black}}>
              No addresses found.
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Neomorph
          lightShadowColor={AppColors.background}
          swapShadows
          style={ContainerStyles.touchableOpacityNeomorphContainer2}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
