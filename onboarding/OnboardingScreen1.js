import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import FONTS from '../constants/Fonts';
import IMAGES from '../constants/Images';
import COLORS from '../constants/Colors';

const OnboardingScreen1 = ({ navigation }) => {

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
        navigation.navigate('OnboardingScreen2');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoView}>
                <Text style={styles.logoText}>Lingy</Text>
            </View>
            <View style={styles.imgView}>
                <Image source={IMAGES.onboarding1} resizeMode='contain' style={styles.image} />
            </View>
            <View style={styles.descView}>
                <Text style={styles.descText}>Unlock new worlds with every word!</Text>
            </View>
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                    <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default OnboardingScreen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    logoView: {
        flex: 1,
        paddingTop: 40,
    },
    imgView: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    descView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logoText: {
        fontSize: 64,
        color: COLORS.green,
        fontFamily: FONTS.BerkshireSwash,
    },
    image: {
        height: 320,
        width: 320,
    },
    btn: {
        backgroundColor: COLORS.purple,
        height: 50,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    btnText: {
        color: COLORS.green,
        fontSize: 18,
        fontWeight: 'bold',
    },
    descText: {
        fontSize: 24,
        color: COLORS.black,
        fontWeight: 'bold',
        fontFamily: FONTS.ArchivoBold,
        marginHorizontal: 24,
        textAlign: 'center',
    },
});
