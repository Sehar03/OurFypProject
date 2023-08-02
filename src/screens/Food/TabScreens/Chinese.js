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
import PastaCard from '../../../components/Cards/PastaCard';
import ChineseCard from '../../../components/Cards/ChineseCard';


const Chinese = ({navigation},props) => {
  const [allChineseCards,setAllChineseCards]=useState([{
    uri:require('../../../assets/Images/chinese.jpeg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"35 min"
  },
  {
    uri:require('../../../assets/Images/chinese2.jpeg'),
    title:"Organic Chef",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/chinese5.jpg'),
    title:"Cheese It",
    deliveryTime:"25 min"
  },
  {
    uri:require('../../../assets/Images/chinese3.jpeg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"30 min"
  },
  {
    uri:require('../../../assets/Images/chinese4.jpeg'),
    title:"Chiken Cuisine",
    deliveryTime:"40 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
  <FlatList data={allChineseCards}
          renderItem={({item})=>{
              return <ChineseCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Chinese;
