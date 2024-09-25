import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import IMAGES from '../constants/Images';
import COLORS from '../constants/Colors';

const homeName = 'Home';
const libraryName = 'Library';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    justifyContent: 'center',
                },
                tabBarItemStyle: {
                    marginHorizontal: 40,
                    padding: 20,
                },
                tabBarActiveTintColor: COLORS.green,
                tabBarInactiveTintColor: COLORS.darkblue,
                tabBarShowLabel: false,
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={homeName}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={IMAGES.home}
                                style={{
                                    height: 35,
                                    width: 35,
                                    tintColor: focused ? COLORS.green : COLORS.darkblue,
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={libraryName}
                component={LibraryScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={IMAGES.library}
                                style={{
                                    height: 35,
                                    width: 35,
                                    tintColor: focused ? COLORS.green : COLORS.darkblue,
                                }}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={profileName}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={IMAGES.profile}
                                style={{
                                    height: 35,
                                    width: 35,
                                    tintColor: focused ? COLORS.green : COLORS.darkblue,
                                }}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
