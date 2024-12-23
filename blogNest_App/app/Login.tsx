import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Login = () => {

  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Login {id}</Text>
    </View>
  )
}

export default Login