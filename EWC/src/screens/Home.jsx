import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
  Image,
  FlatList,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {SafeAreaView} from 'react-native-safe-area-context';
import {icons, images} from '../constants';
import {useState, useEffect} from 'react';
const RenderItem = ({peripheral}) => {
  const {name, rssi, connected} = peripheral;
  return (
    <>
      {name && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            color: 'white',
          }}>
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{name}</Text>
            <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              connected
                ? disconnectFromPeripheral(peripheral)
                : connectToPeripheral(peripheral)
            }
            style={styles.deviceButton}>
            <Text
              style={[
                styles.scanButtonText,
                {fontWeight: 'bold', fontSize: 16},
              ]}>
              {connected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const DeviceList = ({peripheral, connect, disconnect}) => {
  const {name, rssi, connected} = peripheral;
  return (
    <>
      {name && (
        <View style={styles.deviceContainer}>
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{name}</Text>
            <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              connected ? disconnect(peripheral) : connect(peripheral)
            }
            style={styles.deviceButton}>
            <Text
              style={[
                styles.scanButtonText,
                {fontWeight: 'bold', fontSize: 16},
              ]}>
              {connected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const Home = ({navigation}) => {
  const BleManagerModule = NativeModules.BleManager;
  const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const handleGetConnectedDevices = () => {
    BleManager.getConnectedPeripherals().then(results => {
      for (let i = 0; i < results.length; i++) {
        let peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
      }
    });
  };
  const handleGetDiscoveredDevices = () => {
    BleManager.getBondedPeripherals().then(results => {
      for (let i = 0; i < results.length; i++) {
        let peripheral = results[i];
        // peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setDiscoveredDevices(Array.from(peripherals.values()));
      }
    });
  };
  useEffect(() => {
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    BleManager.start({showAlert: false}).then(() => {
      console.log('BleManager initialized');
      handleGetConnectedDevices();
      handleGetDiscoveredDevices();
    });
    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        peripherals.set(peripheral.id, peripheral);
        setDiscoveredDevices(Array.from(peripherals.values()));
      },
    );
    let stopConnectListener = BleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      peripheral => {
        console.log('BleManagerConnectPeripheral:', peripheral);
      },
    );
    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('scan stopped');
      },
    );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accepted');
            } else {
              console.log('User refused');
            }
          });
        }
      });
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          ).then(result => {
            if (result) {
              console.log('User accepted');
            } else {
              console.log('User refused');
            }
          });
        }
      });
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
          ).then(result => {
            if (result) {
              console.log('User accepted');
            } else {
              console.log('User refused');
            }
          });
        }
      });
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
            );
          }
        });
      }
    }
    return () => {
      stopDiscoverListener.remove();
      stopConnectListener.remove();
      stopScanListener.remove();
    };
  }, []);
  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  // pair with device first before connecting to it
  const connectToPeripheral = peripheral => {
    BleManager.createBond(peripheral.id)
      .then(() => {
        BleManager.connect(peripheral.id);
      })
      .then(result => {
        console.log(result);
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        console.debug(`[connectPeripheral][${peripheral.id}] connected.`);
        console.log('BLE device paired successfully');
      })
      .catch(() => {
        console.log('failed to bond');
      });
  };
  // disconnect from device
  const disconnectFromPeripheral = peripheral => {
    BleManager.removeBond(peripheral.id)
      .then(() => {
        BleManager.disconnect(peripheral.id);
      })
      .then(() => {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);

        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        Alert.alert(`Disconnected from ${peripheral.name}`);
      })
      .catch(() => {
        console.log('fail to remove the bond');
      });
  };
  const handleSearch = () => {
    startScan();
    handleGetConnectedDevices();
    handleGetDiscoveredDevices();
  };
  const isDarkMode = true;
  const router = navigation;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.innerScrollView}>
          <Text style={styles.titleText}>Search for devices</Text>
          <View style={styles.infoContainer}>
            <Image
              source={icons.wheelchair}
              resizeMode="contain"
              alt="wheelchair"
              style={styles.iconImage}
            />
            <Text style={styles.infoText}>
              Please guarantee the battery power, and main power on
            </Text>
          </View>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={images.search}
              style={styles.searchImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.scanButton}
            onPress={startScan}>
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.subtitle, {color: isDarkMode ? 'white' : 'black'}]}>
            Discovered Devices:
          </Text>
          {discoveredDevices.length > 0 ? (
            <FlatList
              data={discoveredDevices}
              renderItem={({item}) => (
                <DeviceList
                  peripheral={item}
                  connect={connectToPeripheral}
                  disconnect={disconnectFromPeripheral}
                />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
          )}
          <Text
            style={[styles.subtitle, {color: isDarkMode ? 'white' : 'black'}]}>
            Connected Devices:
          </Text>
          {connectedDevices.length > 0 ? (
            <FlatList
              data={connectedDevices}
              renderItem={({item}) => (
                <DeviceList
                  peripheral={item}
                  connect={connectToPeripheral}
                  disconnect={disconnectFromPeripheral}
                />
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={styles.noDevicesText}>No connected devices</Text>
          )}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    backgroundColor: '#1C1C1E', // Equivalent to bg-black-200
    flex: 1,
  },
  scrollViewContainer: {
    height: '100%',
  },
  innerScrollView: {
    paddingHorizontal: 16, // Equivalent to px-4
    marginVertical: 24, // Equivalent to my-6
  },
  titleText: {
    fontSize: 32, // Equivalent to text-4xl
    color: '#FFFFFF', // Equivalent to text-white
    fontFamily: 'Poppins-SemiBold', // Equivalent to font-psemibold
    marginTop: 20,
  },
  infoContainer: {
    width: '100%',
    height: 96, // Equivalent to h-24
    paddingHorizontal: 16, // Equivalent to px-4
    backgroundColor: '#2C2C2E', // Equivalent to bg-black-100
    borderRadius: 16, // Equivalent to rounded-2xl
    borderWidth: 2,
    borderColor: '#1C1C1E', // Equivalent to border-black-200
    flexDirection: 'row', // Equivalent to flex-row
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  iconImage: {
    width: 40, // Equivalent to w-10
    height: 40, // Equivalent to h-10
  },
  infoText: {
    fontSize: 18, // Equivalent to text-lg
    color: '#E5E5EA', // Equivalent to text-gray-100
    fontFamily: 'Poppins-ExtraLight', // Equivalent to font-pextralight
    paddingLeft: 4, // Equivalent to ml-1
    marginHorizontal: 10,
  },
  searchImage: {
    maxWidth: 400, // Equivalent to max-w-[400px]
    width: '100%',
    height: 100, // Equivalent to h-[200px]
    marginTop: 20,
  },
  noDevicesText: {
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    color: 'white',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deviceItem: {
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  deviceInfo: {
    fontSize: 14,
  },
  deviceButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
};

export default Home;
