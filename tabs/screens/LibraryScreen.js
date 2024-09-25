import { Image, StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../constants/Colors';
import IMAGES from '../../constants/Images';
import words from '../../data/words.json';
import AUDIOS from '../../constants/Audios';

const STORAGE_KEY = '@library_scroll_index'; // Scroll pozisyonunu saklayacağımız key

const LibraryScreen = () => {
  const sound = useRef(new Audio.Sound()).current;
  const [scrollIndex, setScrollIndex] = useState(0); // Kaydedilen scroll pozisyonu
  const scrollViewRef = useRef(null); // ScrollView'a erişmek için referans

  // AsyncStorage'dan kaydedilen scroll pozisyonunu yükle
  const loadScrollIndex = async () => {
    try {
      const savedIndex = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedIndex !== null) {
        setScrollIndex(Number(savedIndex)); // Kaydedilen scroll pozisyonunu yükle
      }
    } catch (error) {
      console.error('Error loading scroll index: ', error);
    }
  };

  // ScrollView'ın pozisyonunu kaydet
  const saveScrollIndex = async (index) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, index.toString());
    } catch (error) {
      console.error('Error saving scroll index: ', error);
    }
  };

  // Ses çalma fonksiyonu
  const playSound = async (audioKey) => {
    try {
      await sound.unloadAsync(); // Mevcut sesi durdur
      await sound.loadAsync(AUDIOS[audioKey]); // Yeni sesi yükle
      await sound.playAsync(); // Yeni sesi çal
    } catch (error) {
      console.error("Error loading sound: ", error);
    }
  };

  // Bileşen ilk yüklendiğinde scroll pozisyonunu yükle
  useEffect(() => {
    loadScrollIndex();
  }, []);

  // ScrollView pozisyonunu ayarla
  useEffect(() => {
    if (scrollViewRef.current && scrollIndex > 0) {
      scrollViewRef.current.scrollTo({ y: scrollIndex, animated: false });
    }
  }, [scrollIndex]);

  // Scroll pozisyonunu kaydetmek için listener ekle
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y; // Y eksenindeki scroll pozisyonunu al
    saveScrollIndex(offsetY); // Kaydet
  };

  // Bileşen unmount olduğunda sesi temizle
  useEffect(() => {
    return () => {
      sound.unloadAsync(); 
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.topView}>
        <Text style={styles.topViewText}>Learned Words</Text>
      </View>
      <ScrollView 
        ref={scrollViewRef} // ScrollView referansı
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll} // Scroll pozisyonu değiştiğinde kaydet
        scrollEventThrottle={16} // Scroll eventini daha sık dinlemek için
      >
        {words.cards.map((word, index) => (
          <View
            key={index}
            style={[
              styles.box,
              { backgroundColor: index % 2 === 0 ? COLORS.green : COLORS.purple }
            ]}
          >
            <View style={styles.textBox}>
              <Text
                style={[
                  styles.bigText,
                  { color: index % 2 !== 0 ? COLORS.white : COLORS.black }
                ]}
              >
                {word.frontText}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  { color: index % 2 !== 0 ? COLORS.white : COLORS.black }
                ]}
              >
                {word.backText}
              </Text>
            </View>
            <TouchableOpacity onPress={() => playSound(word.audio)}>
              <View style={styles.speakerCircle}>
                <Image source={IMAGES.speaker} style={styles.speaker} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  topViewText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textBox: {
    flex: 1,
  },
  bigText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 14,
  },
  box: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
    borderRadius: 30,
  },
  speakerCircle: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 40,
  },
  speaker: {
    height: 24,
    width: 24,
    tintColor: COLORS.green,
  },
});
