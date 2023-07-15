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
const Signup = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:"white"}}>
      {/* <DrawerHeader navigation={navigation} title="Choose your type"  /> */}
      <BackButtonHeader navigation={navigation} />
      <Text style={[TextStyles.leftHeading]}>Sign Up</Text>
      {/* ye view mai ne neomorhp ko center krny k liye diya hai */}
      <View style={{alignItems: 'center'}}>
        <Neomorph
          darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.inputFieldNeomorphContainer]}>
          <View style={{flexDirection: 'row'}}>
            <SimpleLineIcons
              name="user"
              size={wp('5%')}
              style={IconStyles.signupIcons}
            />
            <TextInput
              placeholder="Enter User Name"
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
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.inputFieldNeomorphContainer]}>
          <View style={{flexDirection: 'row'}}>
            <Fontisto
              name="email"
              size={wp('5%')}
              style={IconStyles.signupIcons}
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
          lightShadowColor={AppColors.background}
          inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.inputFieldNeomorphContainer]}>
          <View style={{flexDirection: 'row'}}>
            <SimpleLineIcons
              name="lock"
              size={wp('5%')}
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
              <Text style={TextStyles.whiteCenteredLable}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </Neomorph>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: '600'}}>Already have an account ? </Text>
          <TouchableOpacity
            // style={{marginLeft: 150}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: AppColors.primary, fontWeight: '600'}}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Image
          source={require('../../assets/images/SignUp1.png')} // Specify the source of the image
          style={[ImageStyles.signupImage]} // Set the desired width and height of the image
        /> */}
      </View>
      <Image
      source={require('../../assets/images/signup3.png')} // Specify the source of the image
      style={{ width: wp('65%'), height: hp('30%'),marginTop:30}} // Set the desired width and height of the image
    />
    </SafeAreaView>
  );
};

export default Signup;
// transform: [{ rotate: '45deg' }]
