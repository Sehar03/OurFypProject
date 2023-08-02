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
import ContainerStyles from '../../../assets/Styles/ContainerStyles';
import TextStyles from '../../../assets/Styles/TextStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PizzaCard from '../../../components/Cards/PizzaCard';
import BurgerCard from '../../../components/Cards/BurgerCard';
import ShawarmaCard from '../../../components/Cards/ShawarmaCard';


const Shawarma = ({navigation},props) => {
  const [allShawarmaCards,setAlShawarmaCards]=useState([{
    uri:require('../../../assets/Images/shawarma.jpeg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/shawarma1.jpg'),
    title:"Organic Chef",
    deliveryTime:"35 min"

  },
  {
    uri:require('../../../assets/Images/shawarma2.webp'),
    title:"Cheese It",
    deliveryTime:"25 min"
  },
  {
    uri:require('../../../assets/Images/shawarma3.jpg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/shawarma4.jpg'),
    title:"Chiken Cuisine",
    deliveryTime:"40 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
  <FlatList data={allShawarmaCards}
          renderItem={({item})=>{
              return <ShawarmaCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Shawarma;
