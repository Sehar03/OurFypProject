import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AddAddress = () => {
  
  return (
    <View style={{height:300,width:400}}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.1877,
          longitude: 74.1945,
          latitudeDelta: 0.215,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
        draggable={true}
          coordinate={{
            latitude: 32.1877,
            longitude: 74.1945,
          }}
          title="Custom Marker"
          description="This is a custom marker"
      
        >
        
        </Marker>
      </MapView>
      
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AddAddress;








































// import React,{useState} from 'react'
// import { SafeAreaView, ScrollView, Text, TextInput,View ,TouchableOpacity} from 'react-native';
// import BackButtonHeader from '../../components/headers/BackButtonHeader';
// import ProfileHeader from '../../components/headers/ProfileHeader';
// import AppColors from '../../assets/colors/AppColors';
// import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
// import ContainerStyles from '../../assets/Styles/ContainerStyles';
// import {Neomorph} from 'react-native-neomorph-shadows';
// import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import IconStyles from '../../assets/Styles/IconStyles';
// import TextStyles from '../../assets/Styles/TextStyles';
// import AddressHeader from '../../components/headers/AddressHeader';
// const AddAddress = ({route,navigation}) => {
//     const [userFirstName, setUserFirstName] = useState('');
//     const [userLastName, setUserLastName] = useState('');
  
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
//       <ScrollView>
//     <AddressHeader navigation={navigation} item ="Add a new Address"/>

//     <View style={{flexDirection:"row"}}>
//           <Octicons
//             name="location"
//             size={25}
//             color={AppColors.primary}
//             style={{marginLeft:wp('6'),marginTop:hp('4'),color:AppColors.primary}}
//           />
//           <Text
//             style={{
//               fontFamily: 'Poppins-SemiBold',
//               color: AppColors.black,
//               marginTop: hp('4'),
//               marginLeft: wp('2'),
//             }}>
//             {' '}
//             750 B Markazi Jamia Masjid Road
//           </Text>
//           <MaterialIcons
//             name="edit"
//             size={25}
//             color={AppColors.primary}
//             style={[IconStyles.EditIcons,{marginTop:hp('4')}]}
//           />
//           </View>
//           <Text style={{marginLeft:wp('14')}}>Gujranwala</Text>
//           </ScrollView>
//           <TouchableOpacity onPress={()=>{
//         navigation.navigate('Address')
//       }}>
//         <Neomorph
//           // darkShadowColor={AppColors.primary}
//           lightShadowColor={AppColors.background}
//           // inner // <- enable shadow inside of neomorph
//           swapShadows // <- change zIndex of each shadow color
//           style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
//           <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//             <Text style={[TextStyles.whiteCenteredLable2]}>Save and continue</Text>
//           </View>
//         </Neomorph>
//       </TouchableOpacity>

//     </SafeAreaView>
//   )
// }

// export default AddAddress;