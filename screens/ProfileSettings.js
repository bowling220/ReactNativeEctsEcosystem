import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native'; // Add TouchableOpacity import
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfileSettings = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission required', 'You need to grant permission to access the camera roll.');
            }
        })();
    }, []);

    const handleImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.cancelled) {
            console.log('Selected image URI:', result.uri); // Check the selected image URI
            setImage(result.uri);
        }
    };

    const handleSave = () => {
        if (image) {
            console.log('Selected image:', image); // Check the selected image URI
            // Here you would save the profile information, including the image URI
            alert('Profile information saved successfully!');
            navigation.navigate('Home', { profileImage: image }); // Pass the selected image URI to HomeScreen
        } else {
            alert('Please select an image.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile Settings</Text>
            <TouchableOpacity onPress={handleImagePicker}>
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : (
                        <View style={styles.circle} />
                    )}
                </View>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50, // Make the border radius half of width/height to make it circular
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'red',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'gray',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ProfileSettings;
