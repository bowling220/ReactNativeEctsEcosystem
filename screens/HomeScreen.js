import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPosts } from '../services/api';
import PostCard from '../components/PostCard';
import { AntDesign } from '@expo/vector-icons';
import { authenticateUser } from '../services/AuthService'; // Import authenticateUser



const HomeScreen = ({ route }) => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImage, setProfileImage] = useState('https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg'); // Default base image

    useEffect(() => {
        
        const loadPosts = async () => {
            try {
                setLoading(true);
                const data = await fetchPosts(page);
                if (data.channel.item.length === 0) {
                    setHasMore(false);
                } else {
                    setPosts([...posts, ...data.channel.item]);
                    setFilteredPosts([...posts, ...data.channel.item]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, [page]);
    
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const isAuthenticated = await authenticateUser();
                console.log('Is authenticated:', isAuthenticated);
                setIsLoggedIn(isAuthenticated);
            } catch (error) {
                console.error('Error authenticating user:', error);
            }
        };
    
        checkAuthentication();
    }, []);
    

    useEffect(() => {
        if (selectedCategory) {
            const filtered = posts.filter(post => post.category.includes(selectedCategory));
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [selectedCategory, posts]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

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

    const handleImagePress = () => {
        if (isLoggedIn) {
            navigation.navigate('ProfileSettings');
        } else {
            navigation.navigate('ProfileScreen');
        }
    };
    
    useEffect(() => {
        if (route.params?.profileImage) {
            setProfileImage(route.params.profileImage);
        }
    }, [route.params?.profileImage]);

    return (
        <View style={styles.container}>
            {/* Profile Image and Title */}
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleImagePress}>
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Ects CMP Ecosystem</Text>
            </View>

            {/* Post List */}
            <ScrollView style={styles.scrollView}>
                {filteredPosts.map((post, index) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        content={post['content-encoded']}
                        imageUrl={post.imageUrl}
                    />
                ))}
                {hasMore && (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loadMoreText}>Load More</Text>
                        )}
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Custom Bottom Navigation */}
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Home')}>
                    <AntDesign name="home" size={24} color="white" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Grades')}>
                    <AntDesign name="profile" size={24} color="white" />
                    <Text style={styles.tabText}>Grades</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('Website')}>
                    <AntDesign name="earth" size={24} color="white" />
                    <Text style={styles.tabText}>Website</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton} onPress={() => handlePagePress('DailyDiscussion')}>
                    <AntDesign name="message1" size={24} color="white" />
                    <Text style={styles.tabText}>Daily Discussion</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        marginBottom: 20,
    },
    loadMoreButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    loadMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabButton: {
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
    },
});

export default HomeScreen;
