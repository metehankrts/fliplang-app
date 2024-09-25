import { Image, StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import IMAGES from '../../constants/Images';
import words from '../../data/words.json';
import AUDIOS from '../../constants/Audios';

const STORAGE_KEY = '@current_card_index';

const HomeScreen = () => {
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const sound = useRef(new Audio.Sound()).current;

 
  const loadIndex = async () => {
    try {
      const savedIndex = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedIndex !== null) {
        setCurrentIndex(Number(savedIndex));
      }
    } catch (error) {
      console.error('Error loading index: ', error);
    }
  };

  const saveIndex = async (index) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, index.toString());
    } catch (error) {
      console.error('Error saving index: ', error);
    }
  };

  const goNext = () => {
    const newIndex = (currentIndex + 1) % words.cards.length;
    setCurrentIndex(newIndex);
    saveIndex(newIndex);
    setFlipped(false);
  };

  const goPrevious = () => {
    const newIndex = (currentIndex - 1 + words.cards.length) % words.cards.length;
    setCurrentIndex(newIndex);
    saveIndex(newIndex);
    setFlipped(false);
  };

  useEffect(() => {
    loadIndex();
  }, []);

  const flipCard = () => {
    Animated.timing(flipAnimation, {
      toValue: flipped ? 0 : 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const { frontText, backText, description, audio } = words.cards[currentIndex];

  const playSound = async () => {
    try {
      const audioKey = words.cards[currentIndex].audio;
      await sound.unloadAsync();
      await sound.loadAsync(AUDIOS[audioKey]);
      await sound.playAsync();
    } catch (error) {
      console.error('Error loading sound: ', error);
    }
  };

  useEffect(() => {
    return () => {
      sound.unloadAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.topView}>
        <Text style={styles.topViewText}>{description}</Text>
      </View>
      <View style={styles.midView}>
        <TouchableOpacity onPress={flipCard} style={styles.cardContainer}>
          <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
            <Text style={styles.cardText}>{frontText}</Text>
          </Animated.View>
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
            <Text style={styles.cardText}>{backText}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={goPrevious} style={styles.button}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>
          <View style={styles.speakerCircle}>
            <Image source={IMAGES.speaker} style={styles.speaker} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={goNext} style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
  topView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topViewText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  midView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 250,
    height: 350,
    borderRadius: 30,
    position: 'relative',
  },
  card: {
    height: 350,
    width: 250,
    backgroundColor: COLORS.purple,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  cardBack: {
    backgroundColor: COLORS.green,
  },
  cardText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  bottomView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakerCircle: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkblue,
    borderRadius: 40,
    marginHorizontal: 10,
  },
  speaker: {
    height: 40,
    width: 40,
    tintColor: COLORS.green,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 48,
    backgroundColor: COLORS.darkblue,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.white,
  },
});
