import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
const AddAddress = () => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <View >
       <View style={{height:800,width:400}}>
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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
      map: {
        ...StyleSheet.absoluteFillObject,
      },

});

export default AddAddress;



























// import React from 'react';
// import { View, StyleSheet,Image } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';

// const AddAddress = () => {
  
//   return (
//     <View style={{height:300,width:400}}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 32.1877,
//           longitude: 74.1945,
//           latitudeDelta: 0.215,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         <Marker
//         draggable={true}
//           coordinate={{
//             latitude: 32.1877,
//             longitude: 74.1945,
//           }}
//           title="Custom Marker"
//           description="This is a custom marker"
      
//         >
        
//         </Marker>
//       </MapView>
      
//     </View>
   
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default AddAddress;