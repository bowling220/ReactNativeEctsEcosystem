import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { fetchPosts } from './api';
import PostCard from './PostCard';

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data.channel.item);
    };
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
      </View>
      {posts.length > 0 && (
        <ScrollView>
          {posts.map((post, index) => (
            <PostCard key={index} title={post.title} content={post['content-encoded']} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center items horizontally
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginTop: 10, // Move the header down by 10 units
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto', // Move the text to the right edge
    marginRight: 160, // Add some space to the right of the text
  },
  menuButton: {
    marginRight: 10, // Add some space to the left of the button
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'lightblue',
  },
  menuButtonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <HomeScreen />
    </NavigationContainer>
  );
};

export default App;
