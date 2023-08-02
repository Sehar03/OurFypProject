import React from 'react';
import {Text, StyleSheet, Image, FlatList ,TouchableOpacity, View} from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextStyles from '../../assets/Styles/TextStyles';
const data = [
  {
    id: '1',
    image: require('../../assets/Images/image32.jpg'),
    width: wp(90),
    height: hp(30),
    name:"Baba Freed Burger Point" ,
    rupees:"Rs.49.00"
    },
  {
    id: '2',
    image: require('../../assets/Images/image23.png'),
    width: wp(90),
    height: hp(30),
    name:"Naveed Tikka Shop",
    rupees:"Rs.49.00"
  },{
    id: '3',
    image: require('../../assets/Images/image22.png'),
    width: wp(90),
    height: hp(30),
    name:"Ghar ka khana",
    rupees:"Rs.49.00"
  },{
    id: '4',
    image: require('../../assets/Images/image33.jpg'),
    width: wp(90),
    height: hp(30),
    name:"Domino's Pizza",
    rupees:"Rs.49.00"
  },{
    id: '5',
    image: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    name:"Banjoosa Pizza & Fast Food",
    rupees:"Rs.49.00"
  },{
    id: '6',
    image: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    name:"The AI Baik",
    rupees:"Rs.49.00"
  },{
  id: '7',
    image: require('../../assets/Images/image24.png'),
    width: wp(90),
    height: hp(30),
    name:"The AI Baik",
    rupees:"Rs.49.00"
  },
  // Add more data objects for more cards...
];

const LargeCard= ({navigation}) => {
  
  const renderItem = ({ item }) => (
    
    <TouchableOpacity>
   
     <Neomorph
      darkShadowColor={AppColors.Gray}
      lightShadowColor={AppColors.Gray}
      inner // <- enable shadow inside of neomorph
      swapShadows // <- change zIndex of each shadow color
      style={{ 
        width: wp(90), // Adjust card width as per your requirement
    height:hp(30),
    borderRadius:15,
    shadowColor: AppColors.background,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop:hp('2'),
    marginRight:0,
    marginLeft:wp('4'),
    
    }}
    >
     <Image source={item.image} style={{height:item.height,width:item.width,borderRadius:15}}/>
    </Neomorph>
    <Text style={[TextStyles.smallText,{marginTop:7,fontFamily:"Poppins-Bold"}]}>{item.name}</Text>
    <View style={{flexDirection:"row"}}>
    <Image source={require('../../assets/Images/image31.jpg')} style={{height:hp('2%'),width:wp('5%'),marginLeft:wp('5.5')}} />
    <Text style={{marginLeft:10}}>{item.rupees}</Text>
    </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      Vertical
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};
export default LargeCard;
