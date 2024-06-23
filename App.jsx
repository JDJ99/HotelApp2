import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './components/Theme';
import ListScreen from './components/ListScreen';
import MapScreen from './components/MapScreen';
import SettingScreen from './components/SettingScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name='MainTabs' component={MainTabs} />
          <Stack.Screen name='SingleMapScreen' options={{ title: "Detail" }} component={MapScreen} />
        </Stack.Navigator>
        {/* <MainTabs /> */}
      </NavigationContainer>
    </ThemeProvider>
  );
};

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.bgColor,
        },
        tabBarLabelStyle: {
          color: colors.text,
        },
        headerStyle: {
          backgroundColor: colors.bgColor,
        },
        headerTintColor: colors.text
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
        name="SettingScreen"
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
