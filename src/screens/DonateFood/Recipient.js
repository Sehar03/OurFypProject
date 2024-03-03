import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, FlatList, ImageBackground, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import AppColors from '../../assets/colors/AppColors';
import ProductsBackButton from '../../components/headers/ProductsBackButton';
import TextStyles from '../../assets/Styles/TextStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AppContext from '../../Context/AppContext';
import DonationCard from '../../components/Cards/DonationCard';
const Recipient = ({route, navigation}) => {
  // const{imageUri}= route.params
  const {donatedData, selectedDonationState, baseUrl, currentUser} =
    useContext(AppContext);
  const [donationData, setDonationData] = useState([]);
  const handleBackButtonPress = () => {
    navigation.navigate('DonateHome');
    return true; // Prevent default behavior (exit the app)
  };

  useEffect(() => {
    // Add a listener for the back button press
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress
    );

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      backHandler.remove();
};
},[]);
  useEffect(() => {
    // Fetch donation data for the current user from MongoDB
    const fetchDonationData = async () => {
      try {
        const formData = new FormData();
        console.log('id from context', currentUser.userId);
        formData.append('userId', currentUser.userId);
        const response = await fetch(`${baseUrl}/getDonationData`, {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          console.log(await response.text());
          return;
        }

        const data = await response.json();
        setDonationData(data.donationData);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchDonationData();
  }, [currentUser]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
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
      <Text style={[TextStyles.whiteCenteredLable, {color: 'black'}]}>
        Donated Food Details
      </Text>
      <FlatList
        data={donationData}
        renderItem={({item}) => {
          return <DonationCard navigation={navigation} item={item} />;
        }}
      />
      {/* <Text>{name} </Text> */}
    </SafeAreaView>
  );
};

export default Recipient;