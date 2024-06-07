import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton} from '../components';
import {images} from '../constants';
import {
  Platform,
  NativeModules,
  useColorScheme,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {useEffect} from 'react';
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'black', // Equivalent to bg-primary
    height: '100%',
  },
  outerScrollView: {
    height: '100%',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16, // Equivalent to px-4
  },
  logoImage: {
    width: 380, // Equivalent to w-[380px]
    height: 200, // Equivalent to h-[200px]
    resizeMode: 'contain',
  },
  componentImage: {
    maxWidth: 380, // Equivalent to max-w-[380px]
    width: '100%',
    height: 200, // Equivalent to h-[200px]
    resizeMode: 'contain',
  },
  titleContainer: {
    position: 'relative',
    marginTop: 20, // Equivalent to mt-5
  },
  titleText: {
    fontSize: 32, // Equivalent to text-3xl
    color: '#FFFFFF', // Equivalent to text-white
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14, // Equivalent to text-sm
    fontFamily: 'sans-serif', // Equivalent to font-pregular
    color: '#A3A3A3', // Equivalent to text-gray-100
    marginTop: 16, // Equivalent to mt-4
    textAlign: 'center',
  },
  highlightedText: {
    fontSize: 14, // Equivalent to text-sm
    fontFamily: 'sans-serif', // Equivalent to font-pregular
    color: 'pink', // Equivalent to text-backgroundcolor-100
    marginTop: 16, // Equivalent to mt-4
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20, // Equivalent to mt-5
  },
});
export default function Splach({navigation}) {
  const router = navigation;
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   ).then(result => {
    //     if (result) {
    //       console.log('Permission is OK');
    //     } else {
    //       PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //       ).then(result => {
    //         if (result) {
    //           console.log('User accept');
    //           router.navigate('BottomTab', {screen: 'Home'});
    //         } else {
    //           console.log('User refuse');
    //         }
    //       });
    //     }
    //   });
    // }
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        // PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        // PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            // PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            // PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              BleManager.enableBluetooth().then(() => {
                console.log('Bluetooth is turned on!');
              });
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }, []);
  const handleGetStarted = () => {
    router.navigate('BottomTab', {screen: 'Home'});
    // .then(result => {
    //   if (result) {
    //     console.log('User accept');
    // router.navigate('BottomTab', {screen: 'Home'});
    //   } else {
    // console.log('User refuse');
    //   }
    // });
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.outerScrollView}>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logoImage} />
          <Image source={images.Componento2} style={styles.componentImage} />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              Making Control, Mobility {'\n'} Taste Better
            </Text>
          </View>
          <Text style={styles.descriptionText}>
            Drive remotely Lock, Unlock and manage speed settings with{' '}
            <Text style={styles.highlightedText}>Wheel Chair Controller</Text>
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={handleGetStarted}
            containerStyles={styles.buttonContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
