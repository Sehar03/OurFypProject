import React, {useState, useContext} from 'react';
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
import ImageStyles from '../../assets/Styles/ImageStyles';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import {Neomorph} from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import IconStyles from '../../assets/Styles/IconStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppContext from '../../Context/AppContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LottieView from 'lottie-react-native';

const Donor = ({navigation, route}) => {
  // states
  const {
    storeInDonatedData,
    baseUrl,
    storeSelectedScreenForAddress,
    selectedDonationState,
    currentUser,
  } = useContext(AppContext);
  const {address} = route.params || ''; // Provide a default empty object if route.params is undefined
  const [donorName, setDonorName] = useState(currentUser.name);
  const [foodDetails, setFoodDetails] = useState('');
  // const [distributionLocation, setDistributionLocation] = useState('');
  const [distributionDateTime, setDistributionDateTime] = useState('');
  const [donorPhoneNumber, setDonorPhoneNumber] = useState(currentUser.phoneNumber);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [donorNameError, setDonorNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [foodDetailsError, setFoodDetailsError] = useState('');
  const [distributionDateTimeError, setDistributionDateTimeError] =
    useState('');
  const [donorPhoneNumberError, setDonorPhoneNumberError] = useState('');

  const showDateTimePicker = () => setModalVisible(true);
  const hideDateTimePicker = () => setModalVisible(false);
  //functions
  const handleDateConfirm = date => {
    setDistributionDateTime(date);
    hideDateTimePicker();
  };
  const isValidPhoneNumber = donorPhoneNumber => {
    const regex = /^(\+92|0)(3[0-9]{9})$/;
    return regex.test(donorPhoneNumber); // Updated to use donorPhoneNumber
  };

  const saveDonationDetails = async () => {
    try {
      //validations
      if (!donorName.trim()) {
        setDonorNameError('*Required field');
      }
      if (!donorPhoneNumber) {
        setDonorPhoneNumberError('*Required field');
      } else if (!isValidPhoneNumber(donorPhoneNumber)) {
        setDonorPhoneNumberError('Invalid Phone Number');
      }

      if (!foodDetails) {
        setFoodDetailsError('*Required field');
      }
      if (!address) {
        setAddressError('Please select an address from the map');
      }
      if (!distributionDateTime) {
        setDistributionDateTimeError('Please select date and time');
      }
      if (
        !donorName.trim() ||
        !donorPhoneNumber ||
        !isValidPhoneNumber(donorPhoneNumber) ||
        !foodDetails ||
        !address ||
        !distributionDateTime
      ) {
        return false;
      }
      //generating API
      const formData = new FormData();

      formData.append('donorName', donorName);
      formData.append('foodDetails', foodDetails);
      formData.append('distributionLocation', address);
      formData.append(
        'distributionDateTime',
        distributionDateTime.toLocaleString(),
      );
      formData.append('donorPhoneNumber', donorPhoneNumber);
      console.log('id from context', currentUser.userId);
      formData.append('userId', currentUser.userId);

      const response = await axios({
        method: 'post',
        url: `${baseUrl}/saveDonationDetails`,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response.data.message === 'Donation details saved successfully.') {
        setShowModal(true);
        storeSelectedScreenForAddress('');
        // navigation.navigate('DonateHome');
      } else {
        console.log('Error in response: ', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: AppColors.white, flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <ImageBackground
        source={selectedDonationState.imageUri}
        style={{height: hp('28%'), width: wp('100%')}}>
        <View
          style={{
            height: hp('28%'),
            width: wp('100%'),
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <ProductsBackButton navigation={navigation} />
          <Text style={[TextStyles.whiteCenteredLable, {fontSize: hp('4%')}]}>
            Welcome
          </Text>
        </View>
      </ImageBackground>
      <Text
        style={[
          TextStyles.leftMediumText,
          {fontSize: hp('4%'), color: AppColors.primary, marginLeft: wp('10%')},
        ]}>
        {selectedDonationState.name}
      </Text>
      <ScrollView>
        <Text style={[TextStyles.donorLabel]}>Donor Name :</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                placeholder="Enter Donnor Name"
                style={[TextFieldStyles.inputField]}
                value={donorName}
                onChangeText={text => {
                  setDonorName(text);
                  setDonorNameError('');
                }}
              />
            </View>
            {donorNameError ? (
              <Text style={[TextStyles.errorText]}>{donorNameError}</Text>
            ) : null}
          </Neomorph>
        </View>
        <Text style={[TextStyles.donorLabel]}>Phone Number :</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.inputFieldNeomorphContainer}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="phone"
                size={wp('6%')}
                style={IconStyles.signupIcons}
              />

              <TextInput
                placeholder="Enter Phone Number"
                style={[TextFieldStyles.inputField]}
                value={donorPhoneNumber}
                keyboardType="numeric"
                onChangeText={text => {
                  setDonorPhoneNumber(text);
                  setDonorPhoneNumberError('');
                }}
              />
            </View>
            {donorPhoneNumberError ? (
              <Text style={[TextStyles.errorText]}>
                {donorPhoneNumberError}
              </Text>
            ) : null}
          </Neomorph>
        </View>

        <Text style={[TextStyles.donorLabel]}>Food Details :</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.background}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.inputFieldNeomorphContainer}>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="fastfood"
                size={wp('6%')}
                style={IconStyles.signupIcons}
              />

              <TextInput
                placeholder="Enter Food Details"
                style={[TextFieldStyles.inputField]}
                value={foodDetails}
                onChangeText={text => {
                  setFoodDetails(text);
                  setFoodDetailsError('');
                }}
              />
            </View>
            {foodDetailsError ? (
              <Text style={[TextStyles.errorText]}>{foodDetailsError}</Text>
            ) : null}
          </Neomorph>
        </View>

        <Text style={[TextStyles.donorLabel]}> Distribution Point :</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              storeSelectedScreenForAddress('Donor');
              navigation.navigate('AddAddress');
            }}>
            <Neomorph
              darkShadowColor={AppColors.primary}
              lightShadowColor={AppColors.background}
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.inputFieldNeomorphContainer}>
              <View style={{flexDirection: 'row'}}>
                <Neomorph
                  darkShadowColor={AppColors.primary}
                  lightShadowColor={AppColors.darkgray}
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    marginLeft: wp('0'),
                    marginTop: hp('0'),
                    shadowRadius: 0.3,
                    backgroundColor: AppColors.white,
                    borderRadius: wp('1%'),
                    height: hp('7'),
                    width: wp('10%'),
                    shadowOpacity: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Octicons
                    name="location"
                    size={wp('5%')}
                    style={[IconStyles.signupIcons, {margin: 0}]}
                  />
                </Neomorph>
                <TextInput
                  placeholder="Donor Full Address"
                  style={[
                    TextFieldStyles.inputField,
                    {marginLeft: wp('3.5'), color: AppColors.black},
                  ]}
                  
                  value={
                    address?.substring(0, 25) +
                    (address?.length > 25 ? '...' : '')
                  }
                  editable={false}
                  
                />
              </View>
              {addressError ? (
                <Text style={[TextStyles.errorText]}>{addressError}</Text>
              ) : null}
            </Neomorph>
          </TouchableOpacity>
        </View>
        <Text style={[TextStyles.donorLabel]}> Distribution Time :</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={showDateTimePicker}>
            <Neomorph
              darkShadowColor={AppColors.primary}
              lightShadowColor={AppColors.background}
              swapShadows // <- change zIndex of each shadow color
              style={ContainerStyles.inputFieldNeomorphContainer}>
              <View style={{flexDirection: 'row'}}>
                <Neomorph
                  darkShadowColor={AppColors.primary}
                  lightShadowColor={AppColors.darkgray}
                  swapShadows // <- change zIndex of each shadow color
                  style={{
                    marginLeft: wp('0'),
                    marginTop: hp('0'),
                    shadowRadius: 0.3,
                    backgroundColor: AppColors.white,
                    borderRadius: wp('1%'),
                    height: hp('7'),
                    width: wp('10%'),
                    shadowOpacity: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="access-time"
                    size={wp('5%')}
                    style={[IconStyles.signupIcons, {margin: 0}]}
                  />
                </Neomorph>

                <TextInput
                  placeholder="Choose Date and Time"
                  style={[
                    TextFieldStyles.inputField,
                    {marginLeft: wp('3.5'), color: AppColors.black},
                  ]}
                  value={
                    distributionDateTime
                      ? distributionDateTime.toLocaleString()
                      : ''
                  }
                  editable={false}
                />
              </View>
              {distributionDateTimeError ? (
                <Text style={[TextStyles.errorText]}>
                  {distributionDateTimeError}
                </Text>
              ) : null}
            </Neomorph>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isModalVisible}
            mode="datetime"
            onConfirm={handleDateConfirm}
            onCancel={hideDateTimePicker}
          />
        </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            saveDonationDetails();
          }}>
          <Neomorph
            darkShadowColor="white"
            lightShadowColor="white"
            swapShadows // <- change zIndex of each shadow color
            style={[
              ContainerStyles.touchableOpacityNeomorphContainer,
              {width: wp('70%')},
            ]}>
            <Text style={TextStyles.whiteCenteredLable}>Save</Text>
          </Neomorph>
        </TouchableOpacity>
        {/* Modal for success animation */}
        {/* <Modal isVisible={showModal}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../assets/animations/thanks.json')}
            autoPlay
            loop
            style={{width: 200, height: 200}}
            // onAnimationFinish={closeModal}
          />
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      </View>
      
      <Modal
       visible={showModal}
        transparent={true}
        animationType="slide"

      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 10,
              width: wp('80'),
            }}
          >
            <Neomorph
              darkShadowColor={AppColors.primary}
              lightShadowColor={AppColors.darkgray}
              swapShadows // <- change zIndex of each shadow color
              style={{
                shadowRadius: 2,
                backgroundColor: AppColors.white,
                borderRadius: wp('1%'),
                height: hp('4%'),
                width: wp('8%'),
                shadowOpacity: 0.3,
                marginLeft: wp('65'),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowModal(!showModal);
                }}>
                <FontAwesome
                  name="close"
                  size={wp('4%')}
                  style={{ color: AppColors.primary }}
                />
              </TouchableOpacity>
            </Neomorph>
            <LottieView
              source={require('../../assets/animations/donationBox.json')}
              autoPlay
              loop
              style={{ width: wp('80'), height: hp('25') }}
              speed={1}
            />
         <TouchableOpacity
              onPress={() => {
                navigation.navigate('Recipient');
              }}>
              <Text style={[TextStyles.simpleText2, {color: 'red'}]}>
                View Donation Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <View style={{}}>
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View
            style={{
              borderBlockColor: AppColors.primary,
              justifyContent: 'center',
              // height: hp('35'),
              backgroundColor:AppColors.white,
              // backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the alpha (0.7) for transparency
              alignItems: 'center',
              // marginTop: 200,
              borderRadius: 15,
              height:hp('20'),width:wp('100')
              // flex:1
            }}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 15}}
              onPress={() => {
                setShowModal(!showModal);
              }}>
              <FontAwesome name="close" size={24} />
            </TouchableOpacity>
            <LottieView
              source={require('../../assets/animations/donationBox.json')}
              autoPlay
              loop
              style={{height: 200, width: 200}}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Recipient');
              }}>
              <Text style={[TextStyles.simpleText2, {color: 'red'}]}>
                View Donation Details
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View> */}
    </SafeAreaView>
  );
};

export default Donor;