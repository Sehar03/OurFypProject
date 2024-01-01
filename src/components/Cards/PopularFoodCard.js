import React, {useContext, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import AppColors from '../../assets/colors/AppColors';
import TextStyles from '../../assets/Styles/TextStyles';
import Modal from 'react-native-modal';
import SingleProductDetail from '../../screens/Products/SingleProductDetail';
import AppContext from '../../Context/AppContext';

const PopularFoodCard = ({navigation, item}) => {
  const{baseUrl} = useContext(AppContext)
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        // openModal();
        navigation.navigate('SingleProductDetail', {
          productImage: baseUrl+item.productImage,
          productName: item.productName,
          productPrice: item.productPrice,
          productDescription:item.productDescription
        });
      }}>
      <Neomorph
        swapShadows
        style={ContainerStyles.squareBoxHalfScreenContainer}>
        <ImageBackground
          source={{uri:baseUrl+item.productImage}}
          style={{width: wp('44'), height: hp('22%')}}
          imageStyle={{
            borderRadius: wp('3%'),
            marginVertical: hp('1%'),
            marginHorizontal: wp('2%'),
          }}>
          <Text style={[TextStyles.popularFoodLabel]}>{item.productName}</Text>
          <View style={[ContainerStyles.popularFoodPiceTextContainer]}>
            <Text style={[TextStyles.simpleText]}>Rs.{item.productPrice}</Text>
          </View>
        </ImageBackground>
      </Neomorph>

      {/* <Modal visible={modalVisible} animationType="slide"> */}
        {/* <View style={{hieght:hp('20'),width:wp('20'),backgroundColor:AppColors.white}}>
          <Text >Hello world</Text>
        </View> */}
        {/* <SingleProductDetail navigation={navigation} /> */}
        {/* <TouchableOpacity onPress={closeModal}> */}
          {/* <Text>Close Modal</Text> */}
        {/* </TouchableOpacity> */}
      {/* </Modal> */}
    </TouchableOpacity>
  );
};

export default PopularFoodCard;
