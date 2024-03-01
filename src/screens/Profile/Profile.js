import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  _ScrollView,
  Text,
} from 'react-native';
import CartHeader from '../../components/headers/CartHeader';
import {Neomorph} from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import IconStyles from '../../assets/Styles/IconStyles';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppContext from '../../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {storeSelectedImageUri, selectedImageUri, currentUser, baseUrl,updateCurrentUser,updateCustomerAfterSignup} =
    useContext(AppContext);
  // const [userName, setUserName] = useState('Toqeer Fatima');
  // const [userEmail, setUserEmail] = useState('toqeerfatima@gmail.com');
  // const [userMobileNumber, setMobileNumber] = useState('+923003785966');
  // const [selectedImageUri, setSelectedImageUri] = useState('');

  // const userName = currentUser.name;
  // const userEmail = currentUser.email;
  // const profileImage=currentUser.profileImage;
  // console.log('name', userName);
  // console.log('email', userEmail);
  // console.log('profile',profileImage)

  //functions

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
    // storeSelectedImageUri(images.assets[0].uri);

    updateProfileImage(images.assets[0])
    // console.log(images.assets[0])
    // console.log('i am serry');
    return images;
  };


  const updateProfileImage=async(image)=>{
    try{
      const formData=new FormData();
    formData.append('profileImage', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    formData.append('_id', currentUser.userId);

    const response = await fetch(`${baseUrl}/updateCustomerProfileImage`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('ye rha response',response)

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      console.log(await response.text());
      return;
    }

    const data = await response.json();
    if (data.message === 'Data saved successfully') {
      updateCustomerAfterSignup(true);
      updateCurrentUser({
        userId: data.updatedUser._id,
        email: data.updatedUser.email,
        password: data.updatedUser.password,
        name: data.updatedUser.name,
        profileImage: data.updatedUser.profileImage,
        phoneNumber: data.updatedUser.phoneNumber,
        addresses: data.updatedUser.addresses,
      });
     
      await AsyncStorage.setItem('user', JSON.stringify( {userId: data.updatedUser._id,
        email: data.updatedUser.email,
        password: data.updatedUser.password,
        name: data.updatedUser.name,
        profileImage: data.updatedUser.profileImage,
        phoneNumber: data.updatedUser.phoneNumber,
        addresses: data.updatedUser.addresses,
      customerAfterSignup: true}));
      navigation.navigate('Profile');
    } else {
      console.log('Error in response: ', data);
    }
  } catch (error) {
    console.log('Error:', error);
  }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <CartHeader navigation={navigation} item="Profile" />
      <View style={{justifyContent: 'center'}}>
        <TouchableOpacity onPress={()=>{openGallery();
        }}>
          <Image
          source={{uri: baseUrl+currentUser.profileImage}}
            // source={
            //   selectedImageUri === ''
            //     ? {uri: baseUrl+currentUser.profileImage}
            //     // require('../../assets/Images/defaultProfile.jpg') 
            //     :  {uri: baseUrl+currentUser.profileImage}
            //     // require('../../assets/Images/defaultProfile.jpg')
            // }
            style={{
              height: hp('17%'),
              width: wp('35%'),
              borderRadius: 100,
              alignSelf: 'center',
              // marginBottom: 7,
            }}
          />
          {console.log('fetched profile image ',baseUrl+currentUser.profileImage)}
          <View style={[ContainerStyles.cameraIconView]}>
            <MaterialIcons name="camera-alt" size={23} color="white" />
          </View>
        </TouchableOpacity>
        <View style={{marginTop: hp('4'), alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', {item: 'Name'});
            }}>
            <Neomorph
              darkShadowColor={AppColors.Gray}
              lightShadowColor={AppColors.darkgray}
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.profileInputFieldContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[TextFieldStyles.profileInputField]}>Name</Text>
                <View style={{marginLeft: wp('1')}}>
                  <MaterialIcons
                    name="edit"
                    size={25}
                    color={AppColors.primary}
                    style={[IconStyles.editIcon]}
                  />
                </View>
              </View>
              <Text style={[TextFieldStyles.profileInputFieldText]}>
                {/* {console.log('name',currentUser.name,'email',currentUser.email)} */}
                {currentUser.name}
              </Text>
            </Neomorph>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: hp('4'), alignItems: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', {item: 'Email'});
            }}> */}
            <Neomorph
              darkShadowColor={AppColors.Gray}
              lightShadowColor={AppColors.darkgray}
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.profileInputFieldContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[TextFieldStyles.profileInputField]}>Email</Text>
                {/* <View style={{marginLeft: wp('2')}}>
                  <MaterialIcons
                    name="edit"
                    size={25}
                    color={AppColors.primary}
                    style={[IconStyles.editIcon]}
                  />
                </View> */}
              </View>
              <Text style={[TextFieldStyles.profileInputFieldText]}>
                {currentUser.email}
              </Text>
            </Neomorph>
          {/* </TouchableOpacity> */}
        </View>

        <View style={{marginTop: hp('4'), alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', {item: 'MobileNumber'});
            }}>
            <Neomorph
              darkShadowColor={AppColors.Gray}
              lightShadowColor={AppColors.darkgray}
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.profileInputFieldContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[TextFieldStyles.profileInputField]}>Mobile</Text>
                <MaterialIcons
                  name="edit"
                  size={25}
                  color={AppColors.primary}
                  style={[IconStyles.editIcon, {marginRight: wp('2')}]}
                />
              </View>
              <Text style={[TextFieldStyles.profileInputFieldText]}>
                {currentUser.phoneNumber}
              </Text>
            </Neomorph>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};
export default Profile;
