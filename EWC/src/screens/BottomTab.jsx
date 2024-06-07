import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Home from './Home';
import GamePad from './LockUnlock';
import Remotedrive from './RemoteDrive';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="LockUnlock" component={GamePad} />
      <Tab.Screen name="RemoteDrive" component={Remotedrive} />
    </Tab.Navigator>
  );
};

export default BottomTab;
