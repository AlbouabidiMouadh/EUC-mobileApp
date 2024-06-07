import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {icons} from '../constants';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const Remotedrive = () => {
  const btnAColor = '#FF4B4B',
    btnBColor = '#FF4B4B',
    btnXColor = '#FF4B4B',
    btnYColor = '#FF4B4B';

  const onButtonAPress = () => {
    console.log('You clicked button Right');
  };
  const onButtonBPress = () => {
    console.log('You clicked button Back');
  };
  const onButtonXPress = () => {
    console.log('You clicked button Forward');
  };
  const onButtonYPress = () => {
    console.log('You clicked button turnLeft');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.titleText}>Remote Control Driving</Text>
        <TouchableOpacity style={styles.bluetoothContainer}>
          <Image
            source={icons.bluetoothsignal2}
            resizeMode="contain"
            alt="bluetoothsignal2"
            style={styles.bluetoothIcon}
          />
          <Text style={styles.bluetoothText}>Bluetooth is connected</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarWrapper}>
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={33}
              tintColor="#FF9090"
              backgroundColor="#000"
              arcSweepAngle={240}
              rotation={240}
              lineCap="round"
              style={styles.circularProgress}
            />
            <View style={styles.circularProgressLabel}>
              <Text style={styles.circularProgressText}>Slow</Text>
            </View>
          </View>

          <View style={styles.progressBarWrapper}>
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={20}
              tintColor="#FFBDBD"
              backgroundColor="#000"
              arcSweepAngle={240}
              rotation={240}
              lineCap="round"
              style={styles.circularProgress}
            />
            <View style={styles.circularProgressLabel}>
              <Text style={styles.circularProgressText}>20 Kmh</Text>
            </View>
          </View>

          <View style={styles.progressBarWrapper}>
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={100}
              tintColor="#FF4B4B"
              backgroundColor="#000"
              arcSweepAngle={240}
              rotation={240}
              lineCap="round"
              style={styles.circularProgress}
            />
            <View style={styles.circularProgressLabel}>
              <Text style={styles.circularProgressText}>100 %</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.modeButton}>
            <Image
              source={icons.speed}
              resizeMode="contain"
              alt="Mode"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.speedButton}>
            <Image
              source={icons.speedometer}
              resizeMode="contain"
              alt="speed"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Speed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.batteryButton}>
            <Image
              source={icons.energy}
              resizeMode="contain"
              alt="Battery"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Battery</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controlButtonsContainer}>
          <TouchableOpacity
            style={[styles.controlButton, {backgroundColor: btnXColor, top: 0}]}
            onPress={onButtonXPress}>
            <Image
              source={icons.forward}
              resizeMode="contain"
              alt="forward"
              style={styles.controlButtonIcon}
            />
            <Text style={styles.controlButtonText}>Forward</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              {backgroundColor: btnYColor, right: 50, top: 100},
            ]}
            onPress={onButtonYPress}>
            <Image
              source={icons.left}
              resizeMode="contain"
              alt="left"
              style={styles.controlButtonIcon}
            />
            <Text style={styles.controlButtonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              {backgroundColor: btnAColor, left: 50, top: 100},
            ]}
            onPress={onButtonAPress}>
            <Image
              source={icons.right}
              resizeMode="contain"
              alt="right"
              style={styles.controlButtonIcon}
            />
            <Text style={styles.controlButtonText}>Right</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.controlButton,
              {backgroundColor: btnBColor, top: 200},
            ]}
            onPress={onButtonBPress}>
            <Image
              source={icons.back}
              resizeMode="contain"
              alt="back"
              style={styles.controlButtonIcon}
            />
            <Text style={styles.controlButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    flex: 1,
  },
  scrollViewContainer: {
    padding: 16,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24, // Equivalent to text-3xl
    color: '#FFFFFF', // Equivalent to text-white
    fontFamily: 'Poppins-SemiBold', // Equivalent to font-psemibold
    marginVertical: 20,
  },
  bluetoothContainer: {
    width: '90%',
    height: 50,
    paddingHorizontal: 16, // Equivalent to px-4
    backgroundColor: '#4CAF50', // Equivalent to bg-green-500
    borderRadius: 24, // Equivalent to rounded-3xl
    borderWidth: 2,
    borderColor: '#4A4A4A', // Equivalent to border-gray-700
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  bluetoothIcon: {
    width: 40, // Equivalent to w-10
    height: 40, // Equivalent to h-10
  },
  bluetoothText: {
    fontSize: 18, // Equivalent to text-lg
    color: '#2C2C2E', // Equivalent to text-black-100
    fontFamily: 'Poppins-SemiBold', // Equivalent to font-psemibold
    marginRight: 24, // Equivalent to mr-6
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // marginBottom: 20,
  },
  progressBarWrapper: {
    width: '30%',
    height: 90,
    paddingHorizontal: 8, // Equivalent to px-2
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    borderRadius: 16, // Equivalent to rounded-2xl
    borderWidth: 2,
    borderColor: '#2C2C2E', // Equivalent to border-black-200
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularProgress: {
    position: 'absolute',
    top: 0,
  },
  circularProgressLabel: {
    position: 'absolute',
    top: 60,
    left: '30%',
    zIndex: 1,
  },
  circularProgressText: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: 'Poppins-Black',
    bottom: 30,
    margin: 'auto',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modeButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    borderRadius: 16, // Equivalent to rounded-2xl
    borderWidth: 2,
    borderColor: '#2C2C2E', // Equivalent to border-black-500
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  speedButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    borderRadius: 16, // Equivalent to rounded-2xl
    borderWidth: 2,
    borderColor: '#2C2C2E', // Equivalent to border-black-500
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  batteryButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    borderRadius: 16, // Equivalent to rounded-2xl
    borderWidth: 2,
    borderColor: '#2C2C2E', // Equivalent to border-black-500
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    width: 28, // Equivalent to w-7
    height: 28, // Equivalent to h-7
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Poppins-SemiBold',
  },
  controlButtonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 300,
  },
  controlButton: {
    height: 80,
    width: 130,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Adjusted for easier positioning
  },
  controlButtonIcon: {
    width: 28, // Equivalent to w-7
    height: 40, // Equivalent to h-10
  },
  controlButtonIconBack: {
    marginBottom: -70, // Adjusted to fit the design
  },
  controlButtonText: {
    fontSize: 22,
    color: '#1E1E2D',
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Remotedrive;
