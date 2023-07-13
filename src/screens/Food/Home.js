import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DrawerHeader from '../../components/headers/DrawerHeader'

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
        <DrawerHeader navigation={navigation} title="home drawer"/>
    </SafeAreaView>
  )
}

export default Home