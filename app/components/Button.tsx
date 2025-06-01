import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { primaryColor, secondaryColor } from '../styles/theme';

type Props = {
  label?: string, 
  theme: string, 
  iconName: string,
  path?: string,
  data?: any,
  onPress?: () => void;
};

export default function Button({label, theme = 'default', iconName, onPress, path, data}: Props) {

  const router = useRouter();

  const handlePress = () => {
    if (path) {
      let pathname: any = path;
      router.navigate({pathname, params: data});
    } else if (onPress) {
      onPress();
    }
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={theme === 'primary' ? [styles.button, styles.buttonPrimary] : theme === 'secondary' ? [styles.button, styles.buttonSecondary] : styles.button} onPress={() => handlePress()}>
        <FontAwesome name={iconName} size={18}  style={styles.buttonIcon} />
        {label && (<Text style={styles.buttonLabel}>{label}</Text>)}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
  },
  button: {
    borderWidth: 0,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: primaryColor
  },
  buttonSecondary: {
    backgroundColor: secondaryColor
  },
  buttonIcon: {
    color: '#25292e',
    marginRight: 10,
    fontSize: 24
  },
  buttonLabel: {
    color: '#25292e',
    fontSize: 24
  }
});