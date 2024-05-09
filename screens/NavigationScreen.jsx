/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OTPScreen from './OTPScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './LoginScreen';
import CartScreen from './CartScreen';

export default function NavigationScreen() {
  const Tab = createBottomTabNavigator();

  const Stack = createStackNavigator();
  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="hi" component={MyTabs} />
      </Stack.Navigator>
    );
  }

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {display: 'none'},
          tabBarActiveTintColor: '#FFC300',
          tabBarInactiveTintColor: '#000',
        }}>
        <Tab.Screen
          name="Home"
          component={CartScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="heart" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={OTPScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="home" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={LoginScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="ticket" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
