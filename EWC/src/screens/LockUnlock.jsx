import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {icons} from '../constants'; // Assuming icons is an object with image sources
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const GamePad = () => {
  const [btnAColor, setBtnAColor] = React.useState('#FF4B4B');
  const [btnBColor, setBtnBColor] = React.useState('#FF4B4B');
  const [btnXColor, setBtnXColor] = React.useState('#FF4B4B');
  const [btnYColor, setBtnYColor] = React.useState('#FF4B4B');

  const onButtonAPress = () => {
    console.log('You clicked button Right');
    setBtnAColor('#346751');
  };

  const onButtonBPress = () => {
    console.log('You clicked button Back');
    setBtnBColor('#346751');
  };

  const onButtonXPress = () => {
    console.log('You clicked button Forward');
    setBtnXColor('#346751');
  };

  const onButtonYPress = () => {
    console.log('You clicked button turnLeft');
    setBtnYColor('#346751');
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: btnXColor}]}
          onPress={onButtonXPress}>
          <Image
            source={icons.forward}
            resizeMode="contain"
            alt="forward"
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Forward</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: btnYColor}]}
          onPress={onButtonYPress}>
          <Image
            source={icons.left}
            resizeMode="contain"
            alt="left"
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: btnAColor}]}
          onPress={onButtonAPress}>
          <Image
            source={icons.right}
            resizeMode="contain"
            alt="right"
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Right</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: btnBColor}]}
          onPress={onButtonBPress}>
          <Image
            source={icons.back}
            resizeMode="contain"
            alt="back"
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={100}
          width={10}
          fill={50}
          tintColor="#FF4B4B"
          backgroundColor="#000"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round">
          {() => (
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>50%</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
};

export default GamePad;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: 80,
    width: 130,
    borderRadius: 90 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    height: 30,
    width: 30,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ECDBBA',
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: '#FFF',
    fontSize: 18,
  },
});
