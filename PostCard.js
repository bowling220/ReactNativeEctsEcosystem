import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, Button } from 'react-native';
import HTML from 'react-native-render-html';

const PostCard = ({ title, content }) => {
    const [expanded, setExpanded] = useState(false);
  
    const handlePress = () => {
      setExpanded(!expanded);
    };
  
    const extractIconImageUrl = () => {
      const regex = /<img[^>`]+src\s*=\s*['\"]([^'\"]+)['\"][^>]*>/g;
      let match = regex.exec(content);
      console.log(match);
      if (match) {
        return match[1];
      }
      return null;
    };
  
    const iconImageUrl = extractIconImageUrl();
  
   // console.log('content:', content);
   // console.log('iconImageUrl:', iconImageUrl);
  
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Image source={iconImageUrl}/>
        {iconImageUrl && <Image source={{ uri: iconImageUrl }} style={styles.iconImage} />}
        <TouchableOpacity onPress={handlePress} style={styles.expandButton}>
          <Text style={styles.expandButtonText}>{expanded ? 'Close' : 'Show more'}</Text>
        </TouchableOpacity>
        <Modal visible={expanded} animationType="slide">
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handlePress} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <HTML source={{ html: content }} />
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
    iconImage: {
      width: '100%',
      height: 200,
      resizeMode: 'contain', // Ensure the image does not go bigger than the page
      borderRadius: 5,
      marginBottom: 5,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    expandButton: {
      alignSelf: 'flex-end',
      marginTop: 5,
      padding: 5,
    },
    expandButtonText: {
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
      top: 10,
      right: 10,
      padding: 5,
    },
    closeButtonText: {
      color: 'blue',
      fontWeight: 'bold',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default PostCard;
