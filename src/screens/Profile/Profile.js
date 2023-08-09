import React,{useState} from 'react';
import { SafeAreaView, View,Image,TextInput, StatusBar} from 'react-native';
import CartHeader from '../../components/headers/CartHeader';
import { Neomorph } from 'react-native-neomorph-shadows';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EstimatedDeliveryCard from '../../components/Cards/EstimatedDeliveryCard';
import CounterModal from '../../components/CounterModal';
import ImageStyles from '../../assets/Styles/ImageStyles';
import { Text } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TextStyles from '../../assets/Styles/TextStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';

import ProfileCard from '../../components/Cards/ProfileCard';

const Profile = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userMobileNumber, setMobileNumber] = useState('');
  
  return (
    <SafeAreaView style={{flex: 1,backgroundColor:AppColors.white}}>
{/* <StatusBar backgroundColor={AppColors.white} barStyle="dark-content" /> */}
    <CartHeader navigation={navigation} item="Profile" />

    <View style={{marginTop:hp('7'),alignItems: 'center'}}>
    <Neomorph
darkShadowColor={AppColors.primary}
lightShadowColor={AppColors.background}
// inner // <- enable shadow inside of neomorph
swapShadows // <- change zIndex of each shadow color
style={{
shadowRadius: 4,
shadowOpacity:0.3,
borderRadius: 10,
backgroundColor: 'white',
width: hp('43'),
height: hp('12'),
}}>
               <Text style={{margin:8}}>Name</Text>
        <Text style={{margin:15,fontFamily:"Poppins-SemiBold",}}>Toqeer Fatima</Text>
</Neomorph>
</View>


<View style={{marginTop:hp('3'),alignItems: 'center'}}>

<Neomorph
darkShadowColor={AppColors.primary}
lightShadowColor={AppColors.background}
// inner // <- enable shadow inside of neomorph
swapShadows // <- change zIndex of each shadow color
style={{
shadowRadius: 4,
shadowOpacity:0.3,
borderRadius: 10,
backgroundColor: 'white',
width: hp('43'),
height: hp('15'),

}}>
<Text style={{margin:8}}>Email</Text>
        <Text style={{margin:20,fontFamily:"Poppins-SemiBold"}}>toqeerfatima42@gmail.com</Text>
</Neomorph>
</View>


<View style={{marginTop:hp('3'),alignItems: 'center'}}>

<Neomorph
darkShadowColor={AppColors.primary}
lightShadowColor={AppColors.background}
// inner // <- enable shadow inside of neomorph
swapShadows // <- change zIndex of each shadow color
style={{
shadowRadius: 4,
shadowOpacity:0.3,
borderRadius: 10,
backgroundColor: 'white',
width: hp('43'),
height: hp('15'),

}}>
<Text style={{margin:8}}>Mobile Number</Text>
        <Text style={{margin:20,fontFamily:"Poppins-SemiBold"}}>+923444869834</Text>
</Neomorph>
</View>


  </SafeAreaView>

  )
}
export default Profile;