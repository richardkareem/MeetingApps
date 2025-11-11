import { StyleSheet, Text, View, Alert } from 'react-native'

import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUser, clearError } from '../../store/slices/authSlice'
import { StackActions, useNavigation } from '@react-navigation/native'

const Login = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('yosi@gmail.com')
  const [password, setPassword] = useState('password')
  
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((state) => state.auth)

  const handleLogin = async () => {
    
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    try {
      const result = await dispatch(loginUser({ email: username, password }))
      if (loginUser.fulfilled.match(result)) {
        
        navigation.dispatch(StackActions.replace('Landing'))
      } else {
        
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'An error occurred')
    }
  }

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.title}>Sign In</Text>
            <TextInput 
              style={styles.input} 
              placeholder='username' 
              value={username}
              onChangeText={setUsername}
              mode="outlined"
            />
            <TextInput 
              style={styles.input} 
              placeholder='password' 
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
            />
            <Button 
              icon={'login'} 
              mode='contained' 
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
})