import React, {useContext, useEffect, useState} from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackButtonHeader from '../../components/headers/BackButtonHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import IconStyles from '../../assets/Styles/IconStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import AppContext from '../../Context/AppContext';

const AfterSignup = ({navigation}) => {
  // states
  const {
    baseUrl,
    currentUser,
    storeSelectedImageUri,
    selectedImageUri,
    updateCurrentUser,
  } = useContext(AppContext);
  const [firstSecurityAnswer, setFirstSecurityAnswer] = useState('');
  const [secondSecurityAnswer, setSecondSecurityAnswer] = useState('');
  // const [selectedImageUri, setSelectedImageUri] = useState('');
  const [customerProfileImage, setCustomerProfileImage] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNummber] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [firstSecurityAnswerError, setFirstSecurityAnswerError] = useState('');
  const [secondSecurityAnswerError, setSecondSecurityAnswerError] =
    useState('');

    const [profileImageError,setProfuleImageError]=useState('')

  //FUNCTIONS
  const isValidPhoneNumber = customerPhoneNumber => {
    const regex = /^(\+92|0)(3[0-9]{9})$/;
    return regex.test(customerPhoneNumber); // Updated to use customerPhoneNumber
  };

  const openGallery = async () => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
    };

    const images = await launchImageLibrary(options);
    storeSelectedImageUri(images.assets[0].uri);
    setCustomerProfileImage(images.assets[0]);
    // console.log(images.assets[0])
    console.log('i am serry');
    return images;
  };

  const uploadProfileImage = async () => {
    try {
      if (!customerPhoneNumber) {
        setPhoneNoError('*Required field');
      } else if (!isValidPhoneNumber(customerPhoneNumber)) {
        setPhoneNoError('Invalid Phone Number');
      }
      if (!firstSecurityAnswer) {
        setFirstSecurityAnswerError('*Required field');
      }
      if (!secondSecurityAnswer) {
        setSecondSecurityAnswerError('*Required field');
      }
      if (
        !customerPhoneNumber ||
        !isValidPhoneNumber(customerPhoneNumber) ||
        !firstSecurityAnswer ||
        !secondSecurityAnswer
      ) {
        return false;
      }
      const formData = new FormData();
      formData.append('profileImage', {
        uri: customerProfileImage.uri,
        type: customerProfileImage.type,
        name: customerProfileImage.fileName,
      });

      const securityQuestions = [
        {question: 'what is your nickname?', answer: firstSecurityAnswer},
        {
          question: 'What is your favourite fruit?',
          answer: secondSecurityAnswer,
        },
      ];

      formData.append('securityQuestions', JSON.stringify(securityQuestions));
      console.log('id from context', currentUser.userId);
      formData.append('_id', currentUser.userId);
      formData.append('customerPhoneNumber', customerPhoneNumber);

      const response = await fetch(`${baseUrl}/uploadProfile`, {
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
      if (data.message === 'Data saved successfully') {
        updateCurrentUser({
          userId: data.registeredUser._id,
          email: data.registeredUser.email,
          password: data.registeredUser.password,
          name: data.registeredUser.name,
          profileImage: data.registeredUser.profileImage,
          phoneNumber: data.registeredUser.phoneNumber,
        });

        await AsyncStorage.setItem('user', JSON.stringify({
          userId: data.registeredUser._id,
          email: data.registeredUser.email,
          password: data.registeredUser.password,
          name: data.registeredUser.name,
          profileImage: data.registeredUser.profileImage,
          phoneNumber: data.registeredUser.phoneNumber,
        }));
        navigation.navigate('Home');
      } else {
        console.log('Error in response: ', data);
      }
    } catch (error) {
      console.log('Error:', error);
    } z
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackButtonHeader navigation={navigation} />
      <ScrollView>
        <TouchableOpacity onPress={openGallery}>
          <Image
            source={
              selectedImageUri === ''
                ? require('../../assets/Images/defaultProfile.jpg')
                : {uri: selectedImageUri}
            }
            style={{
              height: hp('17%'),
              width: wp('35%'),
              borderRadius: 100,
              alignSelf: 'center',
              // marginBottom: 7,
            }}
          />
          <View style={[ContainerStyles.cameraIconView]}>
            <MaterialIcons name="camera-alt" size={23} color="white" />
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: hp('5')}}>
          <Text style={[TextStyles.label, {marginRight: wp('32%')}]}>
            Enter Phone No.
          </Text>

          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={[
              ContainerStyles.inputFieldNeomorphContainer,
              {width: wp('70%')},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Phone no."
                // maxLength={20}
                style={[
                  TextFieldStyles.inputField,
                  {paddingHorizontal: wp('5%'), width: wp('70%')},
                ]}
                keyboardType="phone-pad"
                // style={{fontFamily:'Poppins-Thin'}}
                value={customerPhoneNumber}
                onChangeText={text => {
                  setCustomerPhoneNummber(text);
                  setPhoneNoError('');
                }}
              />
            </View>
            {phoneNoError ? (
              <Text style={[TextStyles.errorText]}>{phoneNoError}</Text>
            ) : null}
          </Neomorph>
        </View>
        <Text
          style={[
            TextStyles.leftHeading,
            {fontSize: hp('3%'), color: AppColors.primary, marginTop: hp('0')},
          ]}>
          Security Questions
        </Text>
        {/* ye view mai ne neomorhp ko center krny k liye diya hai */}
        <View style={{alignItems: 'center'}}>
          <Text style={[TextStyles.label, {marginRight: wp('32%')}]}>
            Q1 : What is your nick name ?
          </Text>

          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={[
              ContainerStyles.inputFieldNeomorphContainer,
              {width: wp('70%')},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Answer"
                // maxLength={20}
                style={[
                  TextFieldStyles.inputField,
                  {paddingHorizontal: wp('5%'), width: wp('70%')},
                ]}
                // style={{fontFamily:'Poppins-Thin'}}
                value={firstSecurityAnswer}
                onChangeText={text => {
                  setFirstSecurityAnswer(text);
                  setFirstSecurityAnswerError('');
                }}
                autoCapitalize='none'
              />
            </View>
            {firstSecurityAnswerError ? (
              <Text style={[TextStyles.errorText]}>
                {firstSecurityAnswerError}
              </Text>
            ) : null}
          </Neomorph>
          <Text style={[TextStyles.label, {marginRight: wp('25%')}]}>
            Q2 : What is your favourite fruit ?
          </Text>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={[
              ContainerStyles.inputFieldNeomorphContainer,
              {width: wp('70%')},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="Answer"
                style={[
                  TextFieldStyles.inputField,
                  {paddingHorizontal: wp('5%'), width: wp('70%')},
                ]}
                value={secondSecurityAnswer}
                autoCapitalize="none"
                onChangeText={text => {
                  setSecondSecurityAnswer(text);
                  setSecondSecurityAnswerError('');
                }}
                
              />
            </View>
            {secondSecurityAnswerError ? (
              <Text style={[TextStyles.errorText]}>
                {secondSecurityAnswerError}
              </Text>
            ) : null}
          </Neomorph>

          <TouchableOpacity
            // onPress={() => {
            // //   // userRegister();
            // // navigation.navigate('Home')

            // }}

            onPress={() => {
              uploadProfileImage();
            }}>
            {/* Rest of the code remains unchanged */}

            <Neomorph
              darkShadowColor="white"
              lightShadowColor="white"
              swapShadows // <- change zIndex of each shadow color
              style={[
                ContainerStyles.touchableOpacityNeomorphContainer,
                {width: wp('70%')},
              ]}>
              <Text style={TextStyles.whiteCenteredLable}>Next</Text>
            </Neomorph>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AfterSignup;
