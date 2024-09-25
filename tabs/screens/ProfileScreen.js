import { Image, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, BackHandler, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IMAGES from '../../constants/Images';
import COLORS from '../../constants/Colors';
import wordsData from '../../data/words.json'; 
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen1 from '../../onboarding/OnboardingScreen1';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: '', image: IMAGES.profile });
  const [totalWords, setTotalWords] = useState(0);

  const loadUserData = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const image = await AsyncStorage.getItem('userImage');
      if (name) {
        const parsedImage = image ? JSON.parse(image) : IMAGES.profile;
        setUser({ name, image: parsedImage });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUserData();
    setTotalWords(wordsData.cards.length);
  }, []);

  const handleLogout = () => {
    navigation.goBack();
  };

  const handleEmailPress = () => {
    Linking.openURL('https://www.instagram.com/metekrts');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoutView}>
        <TouchableOpacity onPress={handleLogout}>
          <Image source={IMAGES.logout} resizeMode='contain' style={styles.logoutImg} />
        </TouchableOpacity>
      </View>
      <View style={styles.underView}>
        <View style={styles.user}>
          <View style={styles.imgContainer}>
            <Image source={user.image} resizeMode='contain' style={styles.userImg} />
          </View>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>

        {/* First Box */}
        <View style={styles.box}>
          <View style={styles.textContainer}>
            <Text style={styles.textBox}>Today's Words</Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.rightBoxText}>10</Text>
          </View>
        </View>

        {/* Second Box */}
        <View style={[styles.box, styles.box2]}>
          <View style={styles.textContainer}>
            <Text style={[styles.textBox, styles.textBox2]}>Total Words</Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.rightBoxText}>{totalWords}</Text>
          </View>
        </View>

        {/* Third Box */}
        <View style={styles.box}>
          <View style={styles.textContainer}>
            <Text style={styles.textBox}>Contact me</Text>
          </View>
          <TouchableOpacity onPress={handleEmailPress}>
            <View style={styles.rightBox}>
              <Image source={IMAGES.rightarrow} resizeMode='contain' style={styles.contactImg}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutView: {
    padding: 20,
    flexDirection: 'row-reverse',
  },
  logoutImg: {
    height: 36,
    width: 36,
    tintColor: COLORS.purple,
  },
  underView: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  user: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    backgroundColor: COLORS.white,
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 5,
    borderColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {
    width: 172,
    height: 172,
    borderRadius: 200,
  },
  userNameContainer: {
    paddingTop: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  textContainer: {
    flex: 1,
  },
  textBox: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: COLORS.black,
  },
  textBox2: {
    color: COLORS.white,
  },
  box: {
    backgroundColor: COLORS.green,
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  box2: {
    backgroundColor: COLORS.purple,
  },
  rightBox: {
    height: 48,
    width: 48,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  rightBoxText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'medium',
  },
  contactImg:{
    width:32,
    height: 32,
    tintColor: COLORS.white,
  }
});
