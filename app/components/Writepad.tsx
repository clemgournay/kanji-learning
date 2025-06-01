import { Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
  parent: string | null;
};


export default function Writepad({parent}: Props) {

  if (Platform.OS === 'web') {
    return <iframe style={styles.webview} src={`http://192.168.1.83/git/Writepad?parent=${parent}`} />
  } else {
    return <WebView style={styles.webview} source={{ uri: `http://192.168.1.83/git/Writepad/?parent=${parent}` }} />;
  }

}

const styles = StyleSheet.create({
  webview: {
    flex: null,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    border: '1px solid grey',
    //backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'white',
  }
});