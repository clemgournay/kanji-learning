import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { secondaryColor } from '../styles/theme';

export default function TabLayout() {
  return (
    <Tabs
     screenOptions={{
      tabBarActiveTintColor: secondaryColor,
      headerStyle: {
        backgroundColor: '#25292e',
      },
      headerShadowVisible: true,
      headerTintColor: '#fff',
      tabBarStyle: {
        backgroundColor: '#25292e'
      }
    }}
    >
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome name="home" style={styles.icon} color={color}></FontAwesome>
        )
      }}></Tabs.Screen>
      <Tabs.Screen name="learn/index" options={{
        title: 'Learn',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome name="graduation-cap" style={styles.icon} color={color}></FontAwesome>
        )
      }}></Tabs.Screen>
      <Tabs.Screen name="learn/list" options={{
        title: 'Learn - categories',
        href: null
      }}></Tabs.Screen>
      <Tabs.Screen name="train" options={{
        title: 'Train',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome name="gear" style={styles.icon} color={color}></FontAwesome>
        )
      }}></Tabs.Screen>
      <Tabs.Screen name="test/index" options={{
        title: 'Test',
        tabBarIcon: ({color, focused}) => (
          <FontAwesome name="check-circle" style={styles.icon} color={color}></FontAwesome>
        )
      }}></Tabs.Screen>
      <Tabs.Screen name="test/run" options={{
        title: 'Test - run',
        href: null
      }}></Tabs.Screen>
      <Tabs.Screen name="test/result" options={{
        title: 'Test - Results',
        href: null
      }}></Tabs.Screen>
    </Tabs>
  )                     
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24
  }
})