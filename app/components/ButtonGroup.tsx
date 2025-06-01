import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyLabel } from '../models/key-label';
import { primaryColor } from '../styles/theme';

type Props = {
  values: KeyLabel[]; 
  initValue: string | number;
  mode: string;
  onSelect: (key: string | number) => void
}

export default function ButtonGroup ({values, initValue, mode, onSelect}: Props) {

  const [value, setValue] = useState<string | number>(initValue);

  const handleSelect = (key: string | number) => {
    setValue(key);
    onSelect(key);
  }

  const getBtnStyles = (v: KeyLabel) => {
    let list: any = [styles.btn];
    if (mode === 'separate') list.push(styles.btnSeparate);
    if (v.key === value) list.push(styles.btnActive);
    return list;
  }

  const renderBtn = values.map((v: KeyLabel, index: number) => (
    <Pressable key={v.key} style={getBtnStyles(v)} onPress={() => handleSelect(v.key)}>
      <Text style={value === v.key ? [styles.btnLabel, styles.btnLabelActive] : [styles.btnLabel]}>{v.label}</Text>
    </Pressable>
  ));

  useEffect(() => {
    setValue(initValue);
  }, []);

  return (<View style={mode === 'separate' ? [styles.container, styles.separate] : mode  === 'vertical' ? [styles.container, styles.vertical] : [styles.container]}>
    {renderBtn}
  </View>)
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  vertical: {
    flexDirection: 'column'
  },
  separate: {
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: 'none'
  },
  btn: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  btnSeparate: {
    flex: 'none',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  btnActive: {
    backgroundColor: primaryColor
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: 26,
    color: 'grey'
  },
  btnLabelActive: {
    color: 'white'
  }
})