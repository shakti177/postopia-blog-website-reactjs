import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <Stack screenOptions={screenOptions} initialRouteName='Login'>
      <Stack.Screen name='index' />
      <Stack.Screen name='Login' />
    </Stack>
  )
}

export default _layout