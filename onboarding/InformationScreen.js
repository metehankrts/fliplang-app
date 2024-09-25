import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, Modal, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import IMAGES from '../constants/Images';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';

const InformationScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [selectedImage, setSelectedImage] = useState(IMAGES.add);
    const [modalVisible, setModalVisible] = useState(false);

    const imageData = [
        { id: '1', image: IMAGES.model1 },
        { id: '2', image: IMAGES.model2 },
        { id: '3', image: IMAGES.model3 },
        { id: '4', image: IMAGES.model4 },
        { id: '5', image: IMAGES.model5 },
        { id: '6', image: IMAGES.model6 },
    ];

    const handleImageSelect = (image) => {
        setSelectedImage(image);
        setModalVisible(false);
    };

    const handleContinue = async () => {
        try {
            await AsyncStorage.setItem('userName', name);
            await AsyncStorage.setItem('userImage', JSON.stringify(selectedImage)); // Stringify the image
            navigation.navigate('MainContainer'); // Navigate to main container
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Choose an Image</Text>
                            <FlatList
                                data={imageData}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleImageSelect(item.image)} style={styles.imageWrapper}>
                                        <Image source={item.image} style={styles.modalImage} />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </View>
                </Modal>

                <View style={styles.imgView}>
                    <Text style={styles.question}>Select a Profile Image</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <View style={styles.imgContainer}>
                            <Image source={selectedImage} resizeMode='cover' style={styles.userImg} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.selectText}>Tap to choose your profile picture</Text>
                </View>

                <View style={styles.nameView}>
                    <Text style={styles.question}>Enter Your Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={COLORS.gray}
                        selectionColor={COLORS.purple}
                    />
                </View>

                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn} onPress={handleContinue}>
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default InformationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20, // Elemanlar için kenar boşluğu ekleyin
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    imgContainer: {
        backgroundColor: COLORS.white,
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: COLORS.purple,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 8,
    },
    userImg: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    selectText: {
        marginTop: 10,
        fontSize: 14,
        color: COLORS.gray,
        fontFamily: FONTS.ArchivoRegular,
    },
    nameView: {
        width: '100%',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    question: {
        textAlign: 'center',
        fontFamily: FONTS.ArchivoBold,
        fontSize: 22,
        color: COLORS.darkBlue,
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderColor: COLORS.purple,
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontFamily: FONTS.ArchivoRegular,
        color: COLORS.black,
        backgroundColor: COLORS.lightGray,
        marginBottom: 15,
    },
    btnView: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    btn: {
        backgroundColor: COLORS.purple,
        height: 50,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        shadowColor: COLORS.purple,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: FONTS.ArchivoBold,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.darkBlue,
    },
    modalImage: {
        width: 80,
        height: 80,
        margin: 8,
        borderRadius: 10,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
