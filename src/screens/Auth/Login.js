import React, {useContext, useEffect, useState} from 'react';

import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButtonHeader from '../../components/headers/BackButtonHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import IconStyles from '../../assets/Styles/IconStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import Feather from 'react-native-vector-icons/Feather';
import AppContext from '../../Context/AppContext';

const Login = ({navigation}) => {
  // states
  const {
    baseUrl,
    updateCurrentUser,
    customerAfterSignup,
    updateCustomerAfterSignup,
  } = useContext(AppContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loginCheckDone, setLoginCheckDone] = useState(false);
  const [userEmailError, setUserEmailError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');

  // functions
  const isEmailValid = userEmail => {
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(userEmail);
  };

  const isPasswordValid = userPassword => {
    return userPassword.length >= 8; // Minimum password length of 8 characters
  };

  const userLogin = () => {
    if (!userEmail) {
      setUserEmailError('Please enter your email address.');
    } else if (!isEmailValid(userEmail)) {
      setUserEmailError('Please enter a valid email address.');
    }
    if (!userPassword) {
      setUserPasswordError('Please enter your password.');
    } else if (!isPasswordValid(userPassword)) {
      setUserPasswordError('Password must be at least 8 characters long.');
    }

    if (
      !userEmail ||
      !userPassword ||
      !isEmailValid(userEmail) ||
      !isPasswordValid(userPassword)
    ) {
      return false;
    }
    const formData = new FormData();
    formData.append('email', userEmail);
    formData.append('password', userPassword);

    axios({
      method: 'post',
      url: `${baseUrl}/login`,
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        if (response.data.match == true && customerAfterSignup == true) {
          const loggedInUser = response.data.loggedInUser;
          updateCustomerAfterSignup(true);
          // Check user status before allowing login
          if (loggedInUser.status === 1) {
            AsyncStorage.setItem('user', JSON.stringify(loggedInUser));
            navigation.navigate('Home');
          } else {
            alert('User is deactivated. Please contact support.');
          }
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              userId: response.data.loggedInUser._id,
              email: response.data.loggedInUser.email,
              password: response.data.loggedInUser.password,
              name: response.data.loggedInUser.name,
              profileImage: response.data.loggedInUser.profileImage,
              phoneNumber: response.data.loggedInUser.phoneNumber,
              addresses: response.data.loggedInUser.addresses,
              fcmToken: response.data.loggedInUser.fcmToken,
              customerAfterSignup: true,
            }),
          );
          updateCurrentUser({
            userId: response.data.loggedInUser._id,
            email: response.data.loggedInUser.email,
            password: response.data.loggedInUser.password,
            name: response.data.loggedInUser.name,
            profileImage: response.data.loggedInUser.profileImage,
            phoneNumber: response.data.loggedInUser.phoneNumber,
            addresses: response.data.loggedInUser.addresses,
            fcmToken: response.data.loggedInUser.fcmToken,
          });

          navigation.navigate('Home');
        } else if (
          response.data.match == true &&
          customerAfterSignup == false
        ) {
          alert('Firstly complete the registration process');
          navigation.navigate('AfterSignup');
        } else {
          alert('No User found with this email and password');
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      {/* <BackButtonHeader navigation={navigation} /> */}
      <View style={{marginTop:hp('11'),backgroundColor:AppColors.white}}></View>

      <Text style={TextStyles.leftHeading}>Log In</Text>
      {/* ye view mai ne neomorhp ko center krny k liye diya hai */}
      <View style={{alignItems: 'center'}}>
        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          swapShadows // <- change zIndex of each shadow color
          style={ContainerStyles.inputFieldNeomorphContainer}>
          <View style={{flexDirection: 'row'}}>
            <Fontisto
              name="email"
              size={wp('5%')}
              style={[IconStyles.signupIcons]}
            />
            <TextInput
              placeholder="Enter Email"
              style={[TextFieldStyles.inputField]}
              value={userEmail}
              autoCapitalize="none"
              onChangeText={text => {
                setUserEmail(text);
                setUserEmailError('');
              }}
            />
          </View>
          {userEmailError ? (
            <Text style={[TextStyles.errorText]}>{userEmailError}</Text>
          ) : null}
        </Neomorph>

        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          swapShadows // <- change zIndex of each shadow color
          style={ContainerStyles.inputFieldNeomorphContainer}>
          <View style={{flexDirection: 'row'}}>
            <SimpleLineIcons
              name="lock"
              size={wp('5%')}
              style={IconStyles.signupIcons}
            />
            <TextInput
              placeholder="Enter Password"
              style={[TextFieldStyles.inputField]}
              value={userPassword}
              autoCapitalize="none"
              secureTextEntry={passwordVisible}
              onChangeText={text => {
                setUserPassword(text);
                setUserPasswordError('');
              }}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={wp('5%')}
                style={[IconStyles.signupIcons, {color: 'grey', opacity: 0.7}]}
              />
            </TouchableOpacity>
          </View>
          {userPasswordError ? (
            <Text style={[TextStyles.errorText]}>{userPasswordError}</Text>
          ) : null}
        </Neomorph>

        <TouchableOpacity
          style={{marginLeft: wp('42%')}}
          onPress={() => {
            // resetPassword();
            navigation.navigate('ForgetPassword');
          }}>
          <Text style={{fontFamily: 'Poppins-SemiBold'}}>
            Forgot Password ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            userLogin();
            console.log('user logged in');
            // navigation.navigate('Login');
          }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.touchableOpacityNeomorphContainer}>
            <Text style={[TextStyles.whiteCenteredLable]}>LOG IN</Text>
          </Neomorph>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 25}}>
          <Text style={{fontFamily: 'Poppins-SemiBold'}}>
            Don't have an account ?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text
              style={{
                color: AppColors.primary,
                fontFamily: 'Poppins-SemiBold',
              }}>
              SIGNUP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={require('../../assets/Images/signup3.png')} // Specify the source of the image
        style={[ImageStyles.loginImage]} // Set the desired width and height of the image
      />
    </SafeAreaView>
  );
};

export default Login;
// transform: [{ rotate: '45deg' }]
