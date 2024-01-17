import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import AppContext from '../../Context/AppContext';
import AppColors from '../../assets/colors/AppColors';
import CartHeader from '../../components/headers/CartHeader';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import TextStyles from '../../assets/Styles/TextStyles';
import { Neomorph } from 'react-native-neomorph-shadows';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: "green",
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: AppColors.background2,
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: AppColors.background2,
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 16,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#000000',
  labelColor: '#000000',
  labelSize: 17,
  currentStepLabelColor: 'green',
};

const TrackOrderStatus = ({ navigation }) => {
  const { baseUrl } = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(0);
  const orderId = 'wWcqDtaE';

  const intervalRef = useRef(null);

  useEffect(() => {
    const viewCurrentOrder = async () => {
      try {
        const response = await axios.post(`${baseUrl}/viewCurrentOrder/${orderId}`);
        console.log('response.data', response.data[0]);

        const statusToStep = {
          'New Order': 0,
          'Ongoing Order': 1,
          'Order is Preparing': 2,
          'Order is Delivered': 3,
        };

        setCurrentStep(statusToStep[response.data[0].status]);

      } catch (error) {
        console.error('Error fetching Order:', error);
      }
    };

    intervalRef.current = setInterval(() => {
      viewCurrentOrder();
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [orderId, baseUrl]);

  const stepLabels = ['Order is Placed', 'Order is Accepted', 'Order is Preparing', 'Order is Delivered'];


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <CartHeader navigation={navigation} item="     Track Order Status" />
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={stepIndicatorStyles}
            stepCount={4}
            direction="vertical"
            currentPosition={currentStep}
            labels={stepLabels}
          />
        </View>
        
      </View>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('FullPriceHomeScreen')
      }}>
      <Neomorph
              darkShadowColor="white"
              lightShadowColor="white"
              swapShadows // <- change zIndex of each shadow color
              style={[
                ContainerStyles.singleProductTouchableOpacityNeomorphContainer,{marginBottom:hp('7'),marginLeft:wp('20')}]}>
              <Text style={[TextStyles.whiteCenteredLable3]}>Back to Home</Text>
            </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical: 20,
    paddingHorizontal: 100,
  }
 
});

export default TrackOrderStatus;
