import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './components/Theme';
import ListScreen from './components/ListScreen';
import MapScreen from './components/MapScreen';
import SettingScreen from './components/SettingScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const MainTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
        },
        tabBarLabelStyle: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: theme === 'dark' ? '#fff' : '#000',
      }}
    >
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarLabel: 'Maps',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="earth" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};



export default App;
