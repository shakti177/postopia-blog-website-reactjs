import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text onPress={() => {
        router.push({ pathname: "/Login", params: { id: 2 } })
      }}>index</Text>
    </View>
  )
}

export default index