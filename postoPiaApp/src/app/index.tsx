import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import useTheme from '../hooks/useTheme'

const index = () => {
  const { toggleTheme } = useTheme()
  return (
    <View>

      <Button icon={"repeat"}
        mode='outlined' onPress={() => {
          toggleTheme()
        }}>Toggle theme</Button>
      <Text>index</Text>
    </View>
  )
}

export default index