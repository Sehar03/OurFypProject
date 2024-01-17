import React,{useContext, useEffect, useState} from 'react';
import {ImageBackground,Text,View,Image,TouchableOpacity, Modal,StyleSheet} from 'react-native';
import AppColors from '../assets/colors/AppColors';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContainerStyles from '../assets/Styles/ContainerStyles';
import TextStyles from '../assets/Styles/TextStyles';
import ImageStyles from '../assets/Styles/ImageStyles';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import AppContext from '../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomeDrawer = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
const {baseUrl,currentUser,updateCurrentUser}=useContext(AppContext)
  const OpenModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigation = useNavigation();
// {console.log('current user hai k nai',currentUser)}

// useEffect(() => {
//   // Check for existing user data
  
//         updateCurrentUser({
//           userId: currentUser.userId,
//           email: currentUser.email,
//           password: currentUser.password,
//           name: currentUser.name,
//           profileImage: currentUser.profileImage,
//           phoneNumber: currentUser.phoneNumber,
//         });
  
 
// }, []);

const handleLogout = async () => {
  try {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem('user');

    // Navigate to the login screen
    navigation.navigate('Login');
    closeModal();
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/Images/image36.jpg')}
        style={{alignItems: 'center', height: hp('30')}}>
        <Image
          source={{uri: baseUrl+currentUser.profileImage}}
                  // source={require('../assets/Images/image13.png')}

          style={[ImageStyles.logoImageStyle]}
        />
        <Text style={[TextStyles.whiteCenteredLable]}>{currentUser.name}</Text>
      </ImageBackground>
      <DrawerContentScrollView>
      <View
        style={{
          paddingLeft: 20,
        }}>
        
        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Signup</Text>
          </View>
        </TouchableOpacity>  */}
        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Address');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Address</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Profile</Text>
          </View>
        </TouchableOpacity>
        {/* ye baad main remove kr du gi */}

        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Orders');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Order</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Notify</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => {
            navigation.navigate('TrackOrderStatus');
          }}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>TrackOrderStatus</Text>
          </View>
        </TouchableOpacity>



        </View>
        </DrawerContentScrollView>

        <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: AppColors.background,
        }}>
        <TouchableOpacity style={{paddingVertical: 15}}
                  onPress={() => {
                    navigation.navigate('Setting');
                  }}>
        
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="settings-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Setting</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={OpenModal} style={{paddingVertical: 15}}>
          <View style={[ContainerStyles.TwoitemsCenter]}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={[TextStyles.mediumTextStyle]}>Log Out</Text>
          </View>
        </TouchableOpacity>

        <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={closeModal}
                >
               
               
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={[TextStyles.leftMediumText, {marginLeft: 0}]}>
                      Logging out?
                    </Text>
                    <Text style={{marginTop:hp('2'),fontFamily:"Poppins-Regular"}}>
                     Thanks for shopping by. See you again soon!
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity onPress={() => {
                        closeModal();
       
        }}>
                        <View
                          style={{
                            borderWidth: 1.5,
                            borderRadius: 8,
                            borderColor: AppColors.primary,
                            height: hp('6'),
                            width: wp('35'),
                            marginTop: hp('5'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            
                          }}>
                          <Text style={{color:AppColors.primary,fontFamily:"Poppins-SemiBold"}}>Cancel</Text>

                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{
                        handleLogout();
                      }}>
                        <View
                          style={{
                            borderWidth: 1.5,
                            borderRadius: 8,
                            borderColor: AppColors.primary,
                            height: hp('6'),
                            width: wp('35'),
                            marginTop: hp('5'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:AppColors.primary
                          }}>
                          <Text style={{color:AppColors.white,fontFamily:"Poppins-SemiBold"}}>Log out</Text>
                        </View>
                      </TouchableOpacity>
                      
                    </View>
                  </View>
                </View>
              </Modal>
      </View>
      </View>
   
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});

export default CustomeDrawer;
