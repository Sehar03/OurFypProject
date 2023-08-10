import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import ProfileHeader from '../../components/headers/ProfileHeader';
import AppColors from '../../assets/colors/AppColors';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TextFieldStyles from '../../assets/Styles/TextFieldStyles';
import ContainerStyles from '../../assets/Styles/ContainerStyles';
import {Neomorph} from 'react-native-neomorph-shadows';
import TextStyles from '../../assets/Styles/TextStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconStyles from '../../assets/Styles/IconStyles';
const Address = ({navigation}) => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <ScrollView>
      {/* <CartHeader navigation={navigation} item="Address" /> */}
       <ProfileHeader navigation={navigation} item="Address" /> 

        <View
          style={{
            height: hp('13'),
            borderBottomWidth: wp('0.1'),
          
          }}>
            <View style={{flexDirection:"row"}}>
          <Octicons
            name="location"
            size={25}
            color={AppColors.primary}
            style={[IconStyles.LocationIcon]}
          />
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: AppColors.black,
              marginTop: hp('2'),
              marginLeft: wp('2'),
            }}>
            {' '}
            750 B Markazi Jamia Masjid Road
          </Text>
         
          <MaterialIcons
            name="edit"
            size={25}
            color={AppColors.primary}
            style={[IconStyles.EditIcons]}
          />
          <FontAwesome name="trash" size={21} color={AppColors.primary}
          style={[IconStyles.Trash]} />

          </View>
          <Text style={{marginLeft:wp('12')}}>Gujranwala</Text>
          <Text style={{marginLeft:wp('12')}}>Note to ride: none</Text>

        </View>
      </ScrollView>
      <TouchableOpacity onPress={()=>{
        navigation.navigate('AddAddress')
      }}>
        <Neomorph
          // darkShadowColor={AppColors.primary}
          lightShadowColor={AppColors.background}
          // inner // <- enable shadow inside of neomorph
          swapShadows // <- change zIndex of each shadow color
          style={[ContainerStyles.touchableOpacityNeomorphContainer2]}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[TextStyles.whiteCenteredLable2]}>
              Add new Address
            </Text>
          </View>
        </Neomorph>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Address;
