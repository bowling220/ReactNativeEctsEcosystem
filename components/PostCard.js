import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Linking } from 'react-native';
import HTML from 'react-native-render-html';

const PostCard = ({ title, content, imageUrl }) => {
    const [expanded, setExpanded] = useState(false);

    const handlePress = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            {imageUrl && (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            )}
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>{expanded ? 'Close' : 'Show more'}</Text>
            </TouchableOpacity>
            <Modal visible={expanded} animationType="slide">
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={handlePress} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <HTML source={{ html: content || '' }} />
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 10, // Increase the marginBottom to create space
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 5,
        padding: 5,
    },
    buttonText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 35, // Adjust the top position to avoid overlapping
        right: 10,
        padding: 5,
    },
    closeButtonText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignSelf: 'center',
    },
    linkButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PostCard;
