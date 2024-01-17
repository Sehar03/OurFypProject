import React, {useEffect, useContext} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppContext from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const {updateCurrentUser, currentUser} = useContext(AppContext);

  // auto login and navigate to the home screen
  useEffect(() => {
    const checkForUserAndNavigate = async () => {
      try {
        // Check for existing user data
        const userData = await AsyncStorage.getItem('user');
        console.log('user stored in AsyncStorage', userData);
        if (userData) {
          // Parse the stored data and update the user context
          const parsedData = JSON.parse(userData);
          updateCurrentUser({
            userId: parsedData.userId,
            email: parsedData.email,
            password: parsedData.password,
            name: parsedData.name,
            profileImage: parsedData.profileImage,
            phoneNumber: parsedData.phoneNumber,
            addresses: parsedData.addresses,
          });
          // Navigate to the home screen
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking for user data:', error);
      }
    };
    checkForUserAndNavigate();
  }, []); // empty dependency array means it runs once when the component mounts
  console.log('user in splash', currentUser);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white, marginTop: hp('3.8')}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={true}
      />

      <Image
        source={require('../../assets/Images/image1.png')}
        style={{height: hp('56%'), width: wp('56%')}}
      />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/Images/logo.png')}
          style={{height: hp('14%'), width: wp('32%')}}
        />
        <Text
          style={{
            fontSize: hp('3%'),
            color: 'black',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Food For Each
        </Text>
      </View>
      <Image
        source={require('../../assets/Images/image2.png')}
        style={{height: hp('28%'), width: wp('100%'), marginTop: hp('8%')}}
      />
    </SafeAreaView>
  );
};

export default Splash;
