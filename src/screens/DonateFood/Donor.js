import React, {useState, useContext} from 'react';
import {
  ImageBackground,
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
  const [donorName, setDonorName] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  // const [distributionLocation, setDistributionLocation] = useState('');
  const [distributionDateTime, setDistributionDateTime] = useState('');
  const [donorPhoneNumber, setDonorPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

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
      if (!donorName) {
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
        !donorName ||
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
      formData.append('distributionDateTime', distributionDateTime.toString());
      formData.append('donorPhoneNumber', donorPhoneNumber);
      console.log('id from context', currentUser.userId);
      formData.append('userId', currentUser.userId);
    
      const response = await fetch(`${baseUrl}/saveDonationDetails`, {
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
      if (data.message === 'Donation details saved successfully.') {
        navigation.navigate('DonateHome');
      } else {
        console.log('Error in response: ', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
    console.log('dontaedDataInAsyncStorage', dontaedDataInAsyncStorage);
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
                  // setDonorName('');
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
                  // setDonorPhoneNumber('');
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
                  // setFoodDetails('');
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
      </View>
    </SafeAreaView>
  );
};

export default Donor;
