import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import useTheme from '../hooks/useTheme'
import { Link } from 'expo-router'

const index = () => {
  const { toggleTheme } = useTheme()
  return (
    <View>

      <Button icon={"repeat"}
        mode='outlined' onPress={() => {
          toggleTheme()
        }}>Toggle theme</Button>
      <Link href="/Search">About</Link>

      <Text>index</Text>
    </View>
  )
}

export default index