import React, { useContext } from 'react'
import { SafeAreaView, View ,TouchableOpacity, Text} from 'react-native'
import MainHeader from '../../components/headers/MainHeader'
import { Image } from 'react-native'
import ImageStyles from '../../assets/Styles/ImageStyles'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppColors from '../../assets/colors/AppColors'
import { Neomorph } from 'react-native-neomorph-shadows'
import ContainerStyles from '../../assets/Styles/ContainerStyles'
import TextStyles from '../../assets/Styles/TextStyles'
import AppContext from '../../Context/AppContext'
import LottieView from 'lottie-react-native'
import DonateHomeHeader from '../../components/headers/DonateHomeHeader'

const DonateHome = ({navigation}) => {
  const {storeSelectedDonationState}=useContext(AppContext);
  return (
<SafeAreaView style={{backgroundColor:AppColors.white,flex:1}}>
  <DonateHomeHeader navigation={navigation} item="Donate Food"/> 
  {/* <LottieView
              source={require('../../assets/animations/thanks.json')}
              autoPlay
              loop
              style={{width: 200, height: 200}}
            /> */}
  <Image
            source={require('../../assets/Images/donate.jpg')} // Specify the source of the image
            style={[ImageStyles.loginImage, {alignSelf:"center"}]} // Set the desired width and height of the image
          />
          <View style={{alignItems:"center",flexDirection:"row",justifyContent:"space-evenly"}}>
            <TouchableOpacity onPress={()=>{
              storeSelectedDonationState({
                imageUri:require('../../assets/Images/donate2.jpg'),
                name:'Donor', 
              })
              navigation.navigate('Donor');
              // navigation.navigate('Donor',{
              //   imageUri:require('../../assets/Images/donate2.jpg'),
              //   name:'Donor',
              // })
            }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.darkOrange}
            swapShadows // <- change zIndex of each shadow color
            style={ContainerStyles.smallNeomorphStyle}>
          <Text style={[TextStyles.primaryText]}>Donor</Text>
          <Text style={[TextStyles.smallText,{textAlign:"center",marginRight:wp('3%')}]}>Be A Giving Heart</Text>
          <Image source={require('../../assets/Images/donate2.jpg')} style={[ImageStyles.donationImage]} />

          </Neomorph>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
                   storeSelectedDonationState({
                    imageUri:require('../../assets/Images/donate4.webp'),
                    name:'Recipient', 
                  })
                  navigation.navigate('Recipient');
            // navigation.navigate('Recipient',{imageUri:require('../../assets/Images/donate2.jpg')})
          }}>
          <Neomorph
            darkShadowColor={AppColors.primary}
            lightShadowColor={AppColors.darkOrange}
            swapShadows // <- change zIndex of each shadow color
            style={[ContainerStyles.smallNeomorphStyle,{marginTop:hp('20%')}]}>
          <Text style={[TextStyles.primaryText]}>Recipient</Text>
          <Text style={[TextStyles.smallText,{textAlign:"center",marginRight:wp('3%')}]}>Hunger Redeemed</Text>
          <Image source={require('../../assets/Images/donate4.webp')} style={[ImageStyles.donationImage]} />
          </Neomorph>
          </TouchableOpacity>
          </View>
          
</SafeAreaView>
  )
}

export default DonateHome