import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AppColors from '../../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pizza from './Pizza';
import ContainerStyles from '../../../assets/Styles/ContainerStyles';
import TextStyles from '../../../assets/Styles/TextStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BiryaniCard from '../../../components/Cards/BiryaniCard';


const Biryani = ({navigation},props) => {
  const [allBiryaniCards,setAllBiryaniCards]=useState([{
    uri:require('../../../assets/Images/biryani6.jpeg'),
    title:"Biryani King - Sialkoti Gate",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/biryani2.jpeg'),
    title:"Biryani King - Nikka Chowk",
    deliveryTime:"25 min"
  },
  {
    uri:require('../../../assets/Images/biryani3.jpeg'),
    title:"Biryani King - Sialkoti Gate",
    deliveryTime:"40 min"
  },
  {
    uri:require('../../../assets/Images/biryani4.jpeg'),
    title:"Biryani King - Sialkoti Gate",
    deliveryTime:"35 min"
  },
  {
    uri:require('../../../assets/Images/biryani5.jpeg'),
    title:"Biryani King - Sialkoti Gate",
    deliveryTime:"25 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
  <FlatList data={allBiryaniCards}
          renderItem={({item})=>{
              return <BiryaniCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Biryani;
