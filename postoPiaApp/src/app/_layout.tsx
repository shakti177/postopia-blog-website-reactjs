import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme
} from 'react-native-paper';
import { Colors } from '../constants/colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import merge from 'deepmerge';
import useTheme from '../hooks/useTheme'
import { StatusBar } from 'expo-status-bar';


const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark }
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);


const _layout = () => {

  // const colorScheme = useColorScheme();
  const { colorScheme } = useTheme();
  // const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? CombinedDarkTheme
      : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={paperTheme}>
        <Stack>
          <Stack.Screen name='index' />
          <Stack.Screen name='home' />
          <Stack.Screen name='Search' />
        </Stack>
      </ThemeProvider>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </PaperProvider>
  )
}

export default _layout