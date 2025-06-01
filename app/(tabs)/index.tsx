import { StyleSheet, View } from 'react-native';

import Button from '@components/Button';
import ImageViewer from '@components/ImageViewer';
import { backgroundColor } from '../styles/theme';

const Logo = require('@assets/images/logo.png');

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageViewer imgSource={Logo}></ImageViewer>
      </View>
      <View style={styles.btnContainer}>
        <Button theme="primary" iconName="graduation-cap" label="Learn" path="/learn"/>
        <Button theme="primary" iconName="gear" label="Train" path="/train"/>
        <Button theme="secondary" iconName="check-circle" label="Test" path="/test"/>
      </View>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1,
    paddingTop: 50
  },
  btnContainer: {
    flexDirection: 'column',
    gap: 20,
    flex: 1,
    alignItems: 'center'
  }
})
