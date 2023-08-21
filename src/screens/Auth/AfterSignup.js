import React, {useEffect, useState} from 'react';

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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';

import IconStyles from '../../assets/Styles/IconStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';

const AfterSignup = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  //FUNCTIONS

  return (
    
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <BackButtonHeader navigation={navigation} />
        <ScrollView>
        <Text style={[TextStyles.leftHeading]}>Security Questions</Text>
        {/* ye view mai ne neomorhp ko center krny k liye diya hai */}
        <View style={{alignItems: 'center'}}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.inputFieldNeomorphContainer}>
            <View style={{flexDirection: 'row'}}>
              <SimpleLineIcons
                name="user"
                size={wp('5%')}
                style={IconStyles.signupIcons}
              />
              <TextInput
                placeholder="Childhood Name"
                // maxLength={20}
                style={[TextFieldStyles.inputField]}
                // style={{fontFamily:'Poppins-Thin'}}
                value={userName}
                onChangeText={text => {
                  setUserName(text);
                 
                }}
              />
            
            </View>

          
          </Neomorph>

          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.inputFieldNeomorphContainer}>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="fruit-grapes-outline"
                size={wp('6%')}
                style={IconStyles.signupIcons}
              />
              <TextInput
                placeholder="Favourite Fruit"
                style={[TextFieldStyles.inputField]}
                value={userEmail}
                autoCapitalize="none"
                onChangeText={text => {
                  setUserEmail(text);
            
                }}
              />
            </View>
           
          </Neomorph>

       

          <TouchableOpacity
            onPress={() => {
              userRegister();
              console.log('signup is running');
    
            }}>
            <Neomorph
              darkShadowColor="white"
              lightShadowColor="white"
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.touchableOpacityNeomorphContainer}>
              <Text style={TextStyles.whiteCenteredLable}>SIGN UP</Text>
            </Neomorph>
          </TouchableOpacity>
       
        </View>
        <Image
          source={require('../../assets/Images/signup3.png')} // Specify the source of the image
          style={[ImageStyles.signupImage]} // Set the desired width and height of the image
        />
        </ScrollView>
      </SafeAreaView>
    
  );
};

export default AfterSignup;
