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

import IconStyles from '../../assets/Styles/IconStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "axios";

const Signup = ({navigation}) => {


  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');




    
    // //FUNCTIONS
    // const userRegister = ()=>{
    //   const formData = new FormData();
    //   formData.append("name",userName);
    //   formData.append("email",userEmail);
    //   formData.append("password",userPassword);
  
    //   axios({
    //     method: "post",
    //     url: "http://192.168.0.1:8888/signup",
    //     data: formData,
    //     headers: { "Content-Type": "multipart/form-data"},
    //   })
    //     .then(function (response) {
    //       if(response.data.save == true)
    //       {
    //         AsyncStorage.setItem("user",JSON.stringify(response.data.newUser));
    //         navigation.navigate('Home');
    //       }else
    //       {
    //         alert("Account cannot be created");
    //       }
    //     })
    //     .catch(function (response) {
    //       //handle error
    //       console.log(response);
    //     });
    // }
  
    // useEffect(()=>{
    //   let currentUserStatus = AsyncStorage.getItem('user');
    //   if(currentUserStatus){
    //     navigation.navigate('Home');
    //       }
    // },[]);
  
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
          // inner // <- enable shadow inside of neomorph
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
          // inner // <- enable shadow inside of neomorph
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
          // inner // <- enable shadow inside of neomorph
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
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.touchableOpacityNeomorphContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                // userRegister();
              }}>
              <Text style={TextStyles.whiteCenteredLable}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </Neomorph>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontFamily:"Poppins-SemiBold"}}>Already have an account ? </Text>
          <TouchableOpacity
            // style={{marginLeft: 150}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: AppColors.primary, fontFamily:"Poppins-SemiBold"}}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      
      </View>
      <Image
      source={require('../../assets/Images/signup3.png')} // Specify the source of the image
      style={[ImageStyles.signupImage]} // Set the desired width and height of the image
    />
    </SafeAreaView>
  );
};

export default Signup;
// transform: [{ rotate: '45deg' }]
