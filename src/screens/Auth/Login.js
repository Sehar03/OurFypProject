import React, {useState} from 'react';

import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DrawerHeader from '../../components/headers/DrawerHeader';
import BackButtonHeader from '../../components/headers/BackButtonHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/styles/ContainerStyles';
import ImageStyles from '../../assets/styles/ImageStyles';
import TextStyles from '../../assets/styles/TextStyles';
import IconStyles from '../../assets/styles/IconStyles';
const Login= ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');


  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <DrawerHeader navigation={navigation} title="Choose your type"  /> */}
      <BackButtonHeader navigation={navigation} />
      <Text
        style={TextStyles.leftHeading}>
        Log In
      </Text>
      {/* ye view mai ne neomorhp ko center krny k liye diya hai */}
      <View style={{alignItems: 'center'}}>
     

        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor="white"
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.inputFieldNeomorphContainer]}>
          <View style={{flexDirection: 'row'}}>
            <Fontisto
              name="email"
              size={wp('10%')}
              style={[IconStyles.signupIcons]}
            />
            <TextInput
              placeholder="Enter Email"
              value={userEmail}
              onChangeText={text => {
                setUserEmail(text);
              }}
            />
          </View>
        </Neomorph>

        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor="white"
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.inputFieldNeomorphContainer]}>
          <View style={{flexDirection: 'row'}}>
            <SimpleLineIcons
              name="lock"
              size={wp('10%')}
              style={IconStyles.signupIcons}
            />
            <TextInput
              placeholder="Enter Password"
              value={userPassword}
              onChangeText={text => {
                setUserPassword(text);
              }}
            />
          </View>
        </Neomorph>

        <TouchableOpacity
          style={{marginLeft: 150}}
          onPress={() => {
            // navigation.navigate('Login');
          }}>
          <Text>Forgot Password</Text>
        </TouchableOpacity>

        <Neomorph
          darkShadowColor="white"
          lightShadowColor="white"
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.touchableOpacityNeomorphContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Login');
              }}>
              <Text
                style={[TextStyles.whiteCenteredLable]}>
                LOG IN
              </Text>
            </TouchableOpacity>
          </View>
        </Neomorph>
        <View style={{flexDirection:"row",marginTop:25}}>
        <Text style={{fontWeight:"600"}}>Don't have an account ?  </Text>
        <TouchableOpacity
          // style={{marginLeft: 150}}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={{color:AppColors.primary,fontWeight:"600"}}>SIGNUP</Text>
        </TouchableOpacity>
</View>
        <Image
      source={require('../../assets/images/Login1.jpg')} // Specify the source of the image
      style={[ImageStyles.loginImage]} // Set the desired width and height of the image
    />
      </View>
      {/* <Image
      source={require('../../assets/images/SignUpImage.jpg')} // Specify the source of the image
      style={{ width: wp('50%'), height: hp('27%'),borderRadius:20 }} // Set the desired width and height of the image
    /> */}
    </SafeAreaView>
  );
};

export default Login;
// transform: [{ rotate: '45deg' }]