import React from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { useTheme } from './Theme';
import ContainerWrapper from './ContainerWrapper';

const SettingScreen = () => {
  const { isDarkTheme, toggleTheme, colors } = useTheme();

  return (
    <ContainerWrapper>
        <Text style={[styles.text,{color: colors.text}]}>Dark Mode</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
        />
    </ContainerWrapper>
  );
};

const styles = StyleSheet.create({
  
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default SettingScreen;
