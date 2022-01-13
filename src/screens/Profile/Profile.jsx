import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Image } from 'react-native';

export const Profile = () => {
    return (
        <View style={styles.div}>
        <Text style={styles.text}>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    div: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
      color: 'red'
    },
  
  });