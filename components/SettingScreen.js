import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useTheme } from './Theme';

const SettingScreen = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dark Mode</Text>
      <Switch
        value={isDarkTheme}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SettingScreen;
