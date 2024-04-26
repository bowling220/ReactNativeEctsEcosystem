import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder, Animated, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons'; // Import icons from Expo vector-icons
import { useNavigation } from '@react-navigation/native';

const DailyDiscussionFragment = () => {
    const navigation = useNavigation();
    const [webViewOpacity] = React.useState(new Animated.Value(1));
    const webViewRef = useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handlePagePress = (pageName) => {
        if (pageName === 'Home') {
            navigation.navigate('Home');
        } else if (pageName === 'Grades') {
            navigation.navigate('Infinite Campus');
        } else if (pageName === 'Website') {
            navigation.navigate('Ecosystem Website'); 
        } else if (pageName === 'DailyDiscussion') {
            navigation.navigate('DailyDiscussion');
        }
    };

    const handleReload = () => {
        if (!isLoading) {
            setIsLoading(true);
            webViewRef.current && webViewRef.current.reload();
        }
    };

    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return gestureState.dy > 50;
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 50) {
                    handleReload();
                }
            },
        })
    ).current;

    return (
        <View style={{ flex: 1 }}>
            {/* Hamburger Menu Button */}
            <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(!menuOpen)}>
                <AntDesign name={menuOpen ? 'close' : 'menuunfold'} size={24} color="black" />
            </TouchableOpacity>

            <Animated.View style={{ flex: 1, opacity: webViewOpacity }} {...panResponder.panHandlers}>
                <WebView
                    originWhitelist={['*']}
                    ref={webViewRef}
                    source={{ uri: 'https://ects-computerprogramming.com/ClassCompanions/DailyDiscussion/' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onLoadStart={() => {
                        setIsLoading(true);
                        Animated.timing(webViewOpacity, {
                            toValue: 0,
                            duration: 250,
                            useNativeDriver: true,
                        }).start();
                    }}
                    onLoad={() => {
                        setIsLoading(false);
                        Animated.timing(webViewOpacity, {
                            toValue: 1,
                            duration: 250,
                            useNativeDriver: true,
                        }).start();
                    }}
                />
                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator color="black" size="small" />
                    </View>
                )}
            </Animated.View>
            {menuOpen && (
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handlePagePress('Home')}>
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handlePagePress('Grades')}>
                        <Text style={styles.menuText}>Grades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handlePagePress('Website')}>
                        <Text style={styles.menuText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => handlePagePress('DailyDiscussion')}>
                        <Text style={styles.menuText}>Daily Discussion</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        ...StyleSheet.absoluteFill,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    menuButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'transparent',
        padding: 10,
        zIndex: 1,
    },
    menuContainer: {
        position: 'absolute',
        top: 50, // Adjust the top value for spacing
        left: 0,
        bottom: 0,
        width: '50%',  // Adjust the width as needed
        backgroundColor: 'rgba(0, 128, 0, 0.9)', // Transparent green
        padding: 20,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        color: 'white',
        fontSize: 18,
    },
});

export default DailyDiscussionFragment;
