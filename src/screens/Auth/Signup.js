import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import DrawerHeader from '../../components/headers/DrawerHeader';

const Signup = ({navigation}) => {
  return (
    <SafeAreaView>
        {/* <DrawerHeader navigation={navigation} title="Choose your type"  /> */}
      <Text>SignUp</Text>
      <TouchableOpacity
        onPress={() => {
        navigation.navigate("Login")
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Signup;
