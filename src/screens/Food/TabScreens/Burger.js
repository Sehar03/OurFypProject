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


const Burger = ({navigation},props) => {
  const [allBurgerCards,setAllBurgerCards]=useState([{
    uri:require('../../../assets/Images/burger1.jpg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/burger2.webp'),
    title:"Organic Chef",
    deliveryTime:"35 min"
  },
  {
    uri:require('../../../assets/Images/burger3.jpg'),
    title:"Cheese It",
    deliveryTime:"50 min",

  },
  {
    uri:require('../../../assets/Images/burger4.jpeg'),
    title:"Mama's Cooking Hub",
    deliveryTime:"45 min"
  },
  {
    uri:require('../../../assets/Images/burger5.jpg'),
    title:"Chiken Cuisine",
    deliveryTime:"25 min"
  },
])
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: AppColors.white,}}>
  <FlatList data={allBurgerCards}
          renderItem={({item})=>{
              return <BurgerCard props={props} item={item}/>
          }}/>

    </SafeAreaView>
  );
};

export default Burger;
