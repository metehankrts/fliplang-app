import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen1 from './onboarding/OnboardingScreen1';
import OnboardingScreen2 from './onboarding/OnboardingScreen2';
import OnboardingScreen3 from './onboarding/OnboardingScreen3';
import InformationScreen from './onboarding/InformationScreen';
import MainContainer from './tabs/MainContainer';
import COLORS from './constants/Colors';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'BerkshireSwash-Regular': require('./assets/fonts/BerkshireSwash-Regular.ttf'),
        'Arhivo-Bold': require('./assets/fonts/Archivo-Bold.ttf'),
        'Archivo-ExtraBold': require('./assets/fonts/Archivo-ExtraBold.ttf'),
        'Arhivo-ExtraLight': require('./assets/fonts/Archivo-ExtraLight.ttf'),
        'Archivo-Italic': require('./assets/fonts/Archivo-Italic.ttf'),
        'Arhivo-Light': require('./assets/fonts/Archivo-Light.ttf'),
        'Archivo-Medium': require('./assets/fonts/Archivo-Medium.ttf'),
        'Arhivo-Regular': require('./assets/fonts/Archivo-Regular.ttf'),
        'Arhivo-Thin': require('./assets/fonts/Archivo-Thin.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const image = await AsyncStorage.getItem('userImage');
        if (name && image) {
          setUser({ name, image });
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadUserData();
  }, []);
  
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color= {COLORS.purple} />
        <Text>Loading...</Text>
      </View>
    );
  }

  const isFirstTime = !user;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstTime ? (
          <>
            <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
            <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
            <Stack.Screen name="OnboardingScreen3" component={OnboardingScreen3} />
            <Stack.Screen name="InformationScreen" component={InformationScreen} />
          </>
        ) : (
          <Stack.Screen name="MainContainer" component={MainContainer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
