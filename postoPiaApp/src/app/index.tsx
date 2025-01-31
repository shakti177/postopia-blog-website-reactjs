import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'
import useTheme from '../hooks/useTheme'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = (): JSX.Element => {
  const { toggleTheme } = useTheme()
  return (
    <SafeAreaView style={styles.container}>

      <Button icon={"repeat"}
        mode='outlined' onPress={() => {
          toggleTheme()
        }}>Toggle theme</Button>
      <Link href="/Search">About</Link>

      <Text>index</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }

})

export default index