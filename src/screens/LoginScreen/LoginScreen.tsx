import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import { InputField, Button } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { sendOTP } from '../../services'
import styles from './styles'
const LoginScreen = () => {
  const navigation = useNavigation<any>()

  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const sanitizedPhone = useMemo(() => phone.replace(/\D+/g, '').slice(0, 10), [phone])

  const phoneError = useMemo(() => {
    if (apiError) return apiError
    if (sanitizedPhone.length === 0) return ''
    if (sanitizedPhone.length < 10) return 'Please enter a valid 10-digit phone number.'
    return ''
  }, [sanitizedPhone, apiError])

  const isValid = useMemo(() => sanitizedPhone.length === 10 && phoneError === '' && agreed, [sanitizedPhone, phoneError, agreed])

  const onChangePhone = (value: string) => {
    const onlyDigits = value.replace(/\D+/g, '')
    setPhone(onlyDigits.slice(0, 10))
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('')
    }
  }

  const onSubmit = async () => {
    if (!isValid) return
    
    try {
      setSubmitting(true)
      setApiError('')
      
      console.log('🚀 Sending OTP to:', sanitizedPhone)
      
      // Call the OTP service
      const response = await sendOTP('+91'+sanitizedPhone)
      
      console.log('✅ OTP sent successfully:', response)
      
      // Navigate to OTP verification screen with phone number
      navigation.navigate('OTPVerifyScreen', { 
        phone: sanitizedPhone,
        otpId: response.otpId,
        expiresIn: response.expiresIn
      })
      
    } catch (error: any) {
      console.error('❌ OTP send failed:', error)
      
      // Handle different types of errors
      let errorMessage = 'Failed to send OTP. Please try again.'
      
      if (error.message) {
        errorMessage = error.message
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      setApiError(errorMessage)
      
      // Show alert for critical errors
      Alert.alert(
        'OTP Send Failed',
        errorMessage,
        [{ text: 'OK' }]
      )
      
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <SafeAreaView style={styles.safe}>
    <ImageBackground
    source={require('../../assets/images/login_bg_1.png')}
    style={styles.backgroundImage}
    resizeMode="cover"
    >
      <View style={styles.overlay} />
      <>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.headerRow}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.brand}><Text style={styles.brandT}>T</Text><Text style={styles.brandH}>H</Text><Text style={styles.brandR}>R</Text><Text style={styles.brandY}>Y</Text><Text style={styles.brandL}>L</Text></Text>
          </View>

          <Text style={styles.fieldLabel}>Phone number</Text>

          <InputField
            placeholder="Enter Phone Number"
            keyboardType="number-pad"
            value={sanitizedPhone}
            onChangeText={onChangePhone}
            inputViewStyle={styles.inputContainer}
            leftIcon={<Text style={styles.countryCode}>+91</Text>}
            error={phoneError}
            returnKeyType="done"
            textContentType="telephoneNumber"
            style={styles.phoneNumber}
            
          />

          <Text style={styles.helper}>We'll send you a code– it helps us keep your account secure.</Text>

          <Button
            btnText="Continue"
            onPress={onSubmit}
            isLoading={submitting}
            disabled={!isValid}
            btnViewStyle={styles.continueBtn}
          />

          
          <TouchableOpacity style={styles.agreeRow} activeOpacity={0.8} onPress={() => setAgreed(v => !v)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]} />
            <Text style={styles.agreeText}>I agree to the <Text style={styles.link}>Terms of Use</Text>, <Text style={styles.link}>Privacy Policy</Text> and <Text style={styles.link}>App Policies</Text></Text>
          </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    </ImageBackground>
  </SafeAreaView>
     
  )
}


export default LoginScreen