import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native';
import ProfileHeader from '../../components/headers/ProfileHeader';
import AppColors from '../../assets/colors/AppColors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import TextStyles from '../../assets/Styles/TextStyles';
import AppContext from '../../Context/AppContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfile = ({ route, navigation }) => {
  const {currentUser,updateCurrentUser,baseUrl}=useContext(AppContext);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [userMobileNumber, setUserMobileNumber] = useState(currentUser.phoneNumber);
  const [customerProfileImage, setCustomerProfileImage] = useState('');

  const { item } = route.params;
  const updateCustomerProfile = async () => {
    try {
      const formData = new FormData();
      // formData.append('profileImage', {
      //   uri: customerProfileImage.uri,
      //   type: customerProfileImage.type,
      //   name: customerProfileImage.fileName,
      // });

   

      console.log('id from context to update profile', currentUser.userId);
      formData.append('_id', currentUser.userId);
      formData.append('customerName', userName);
      // formData.append('customerEmail', userEmail);

      formData.append('customerPhoneNumber', userMobileNumber);

      const response = await fetch(`${baseUrl}/updateCustomerProfile`, {
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
          userId: data.updatedUser._id,
          email: data.updatedUser.email,
          password: data.updatedUser.password,
          name: data.updatedUser.name,
          profileImage: data.updatedUser.profileImage,
          phoneNumber: data.updatedUser.phoneNumber,
          addresses: data.updatedUser.addresses,

        });

        await AsyncStorage.setItem('user', JSON.stringify({  userId: data.updatedUser._id,
          email: data.updatedUser.email,
          password: data.updatedUser.password,
          name: data.updatedUser.name,
          profileImage: data.updatedUser.profileImage,
          phoneNumber: data.updatedUser.phoneNumber,
          addresses: data.updatedUser.addresses,
}));
        navigation.navigate('Profile');
      } else {
        console.log('Error in response: ', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <ScrollView>
        {item == 'Name' ? (
          <View>
            <ProfileHeader navigation={navigation} item="Name" />
            <Text
              style={[TextStyles.simpleText2]}>
              This is how we'll address you
            </Text>
            <Text
              style={[TextFieldStyles.profileInputField2]}>
              {' '}
              Name
            </Text>
            <View style={{}}>
              <Neomorph
                darkShadowColor={AppColors.Gray}
                lightShadowColor={AppColors.background}
                // inner // <- enable shadow inside of neomorph
                swapShadows // <- change zIndex of each shadow color
                style={ContainerStyles.EditNameNeomorphContainer}>
                <TextInput
                  //  placeholder="Enter First name"
                  style={[TextFieldStyles.inputFieldEdit]}
                  value={userName}
                  onChangeText={text => {
                    setUserName(text);
                  }}
                />
              </Neomorph>
            </View>
          
          </View>
        // ) : (
        //   [
        //     item == 'Email' ? (
        //       <View>
        //         <ProfileHeader navigation={navigation} item="Email" />
        //         <Text
        //           style={TextStyles.simpleText2}>
        //           Make sure we can reach you at your new email
        //         </Text>
        //         <Text
        //           style={TextFieldStyles.profileInputField2}>
        //           {' '}
        //           Email{' '}
        //         </Text>
        //         <Neomorph
        //           darkShadowColor={AppColors.Gray}
        //           lightShadowColor={AppColors.background}
        //           // inner // <- enable shadow inside of neomorph
        //           swapShadows // <- change zIndex of each shadow color
        //           style={ContainerStyles.EditNameNeomorphContainer}>
        //           <TextInput
        //             //  placeholder="Enter First name"
        //             style={[TextFieldStyles.inputFieldEdit]}
        //             value={userEmail}
        //             onChangeText={text => {
        //               setUserEmail(text);
        //             }}
        //           />
        //         </Neomorph>
        //       </View>
            ) : (
              <View>
                <ProfileHeader navigation={navigation} item="Mobile Number" />
                <Text
                  style={[TextStyles.simpleText2, { marginRight: wp('6') }]}>
                  If you change to a new number, we'll take you through a
                  verification process at checkout the next time you order
                </Text>
                <Text
                  style={[TextFieldStyles.profileInputField2]}>
                  {' '}
                  Mobile number{' '}
                </Text>
                <Neomorph
                  darkShadowColor={AppColors.Gray}
                  lightShadowColor={AppColors.background}
                  // inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={ContainerStyles.EditNameNeomorphContainer}>
                  <TextInput
                    //  placeholder="Enter First name"
                    style={[TextFieldStyles.inputFieldEdit]}
                    value={userMobileNumber}
                    onChangeText={text => {
                      setUserMobileNumber(text);
                    }}
                  />
                </Neomorph>
              </View>
            // ),
          // ]
        )}
        {/* :
    //   [item=='Mobile Number'?<View>
    // <ProfileHeader navigation={navigation} item ="Name"/>
    //   </View> */}
      </ScrollView>
      <TouchableOpacity onPress={updateCustomerProfile}
      // onPress={() => {
      //   navigation.navigate('Profile')
      // }}
      >
        <Neomorph
          // darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={ContainerStyles.touchableOpacityNeomorphContainer2}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={[TextStyles.whiteCenteredLable2]}>Save</Text>
          </View>
        </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfile;
