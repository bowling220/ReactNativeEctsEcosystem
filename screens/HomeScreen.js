import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchPosts } from '../services/api';
import PostCard from '../components/PostCard';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <View style={styles.container}>
            {/* Hamburger Menu Button */}
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                <FontAwesome name={menuOpen ? 'times' : 'bars'} size={24} color="black" />
            </TouchableOpacity>

            {/* Title */}
            <View style={styles.titleContainer}>
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

            {/* Hamburger Menu */}
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
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
    menuButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'green', // Change background color to green
        padding: 10,
        borderRadius: 20,
        zIndex: 1,
    },
    menuContainer: {
        position: 'absolute',
        top: 50, // Adjust the top value for spacing
        left: 0,
        bottom: 0,
        width: '50%',  // Adjust the width as needed
        backgroundColor: 'green', // Change background color to green
        padding: 20,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 18,
    },
});


export default HomeScreen;
