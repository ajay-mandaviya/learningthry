import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button, OTPInput } from '../../components';
import {  resendOTP } from '../../services';
import { loginSuccess } from '../../redux/auth.slice';

interface RouteParams {
  phone: string;
  otpId?: string;
  expiresIn?: number;
}

const OTPVerifyScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const dispatch = useDispatch();
  const { phone } = (route.params as RouteParams) || { phone: '+919990000000' };

  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [canResend, setCanResend] = useState(false);
  const [apiError, setApiError] = useState('');

  // Mask phone number for display
  const maskedPhone = useMemo(() => {
    if (phone.length >= 10) {
      const start = phone.slice(0, 3);
      const end = phone.slice(-2);
      const middle = '*'.repeat(phone.length - 5);
      return `+91${start}${middle}${end}`;
    }
    return phone;
  }, [phone]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOTPComplete = async (otpValue: string) => {
    if (otpValue.length !== 6) return;
    
    setIsLoading(true);
    setApiError('');
    


    setTimeout(() => {
      const responseData = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NzY4NzAwMCwiZXhwIjoxNjk3NjkwNjAwfQ.sD2FZ8V0LjqjQvO6LxHTBtffGZKXbF8b9ZTOyxKWDGA",
    "user": {
      "id": 1,
      "mobile": "+918469551344",
      "name": "John Doe"
    }
      }
     setIsLoading(false)
      // Store user data in Redux store
      if (responseData.user) {
        dispatch(loginSuccess({
          token: responseData.token,
          user: responseData.user
        }));
        navigation.navigate('HomeScreen');
      }
    }, 1000);
   

    return 
    // try {
    //   console.log('🚀 Verifying OTP:', { phone, otp: otpValue, type: 1 });
      
    //   // Call the verify OTP API
    //   const response :any= await verifyOTP("+91"+phone, otpValue, 2);

    //   console.log('✅ OTP verified successfully:', response);
     
      
    //   // Navigate to HomeScreen on success
    //   navigation.navigate('HomeScreen');
      
    // } catch (error: any) {
    //   console.error('❌ OTP verification failed:', error);
      
    //   // Handle different types of errors
    //   let errorMessage = 'Failed to verify OTP. Please try again.';
      
    //   if (error.message) {
    //     errorMessage = error.message;
    //   } else if (error.response?.data?.message) {
    //     errorMessage = error.response.data.message;
    //   }
      
    //   setApiError(errorMessage);
      
    //   // Show alert for critical errors
    //   Alert.alert(
    //     'OTP Verification Failed',
    //     errorMessage,
    //     [{ text: 'OK' }]
    //   );
      
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleOTPChange = (otpValue: string) => {
    setOtp(otpValue);
    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setIsResending(true);
    setApiError('');
    
    try {
      console.log('🚀 Resending OTP to:', phone);
      
      // Call the resend OTP API
      const response = await resendOTP(phone);
      
      console.log('✅ OTP resent successfully:', response);
      
      // Reset timer
      setTimeLeft(60);
      setCanResend(false);
      setOtp('');
      
      // Show success message
      Alert.alert(
        'OTP Resent',
        'A new OTP has been sent to your mobile number.',
        [{ text: 'OK' }]
      );
      
    } catch (error: any) {
      console.error('❌ Resend OTP failed:', error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to resend OTP. Please try again.';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setApiError(errorMessage);
      
      // Show alert for critical errors
      Alert.alert(
        'Resend Failed',
        errorMessage,
        [{ text: 'OK' }]
      );
      
    } finally {
      setIsResending(false);
    }
  };

  const handleChangePhoneNumber = () => {
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isOTPValid = otp.length === 6;

  return (
    <ImageBackground
      source={require('../../assets/images/otp_bg_1.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>
                We have sent a 6-digit code to your mobile number {maskedPhone}
              </Text>
            </View>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              <OTPInput
                numberOfDigits={6}
                onFilled={handleOTPComplete}
                onTextChange={handleOTPChange}
                disabled={isLoading || isResending}
                autoFocus={true}
                focusColor="#60a5fa"
                hideStick={true}
                placeholder="******"
                blurOnFilled={true}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                onFocus={() => console.log("OTP Input Focused")}
                onBlur={() => console.log("OTP Input Blurred")}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                textProps={{
                  accessibilityRole: "text",
                  accessibilityLabel: "OTP digit",
                  allowFontScaling: false,
                }}
              />
            </View>

            {/* API Error Display */}
            {apiError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            ) : null}

            {/* Resend Code */}
            <View style={styles.resendContainer}>
              {canResend ? (
                <TouchableOpacity onPress={handleResendCode} disabled={isLoading || isResending}>
                  <Text style={[styles.resendText, (isLoading || isResending) && styles.disabledText]}>
                    {isResending ? 'Resending...' : 'Resend Code'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.timerText}>Resend code in {formatTime(timeLeft)}</Text>
              )}
            </View>

            {/* Change Phone Number */}
            <TouchableOpacity style={styles.changePhoneContainer} onPress={handleChangePhoneNumber}>
              <Text style={styles.changePhoneText}>Change Phone Number</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <View style={styles.buttonContainer}>
              <Button
                btnText="Continue"
                onPress={() => handleOTPComplete(otp)}
                disabled={!isOTPValid || isLoading || isResending}
                isLoading={isLoading}
                btnViewStyle={styles.continueButton}
              />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backIcon: {
    color: '#ffffff',
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
    

  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  otpContainer: {
    alignItems:'center'
  },
  errorContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  disabledText: {
    opacity: 0.5,
  },
  resendContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  resendText: {
    fontSize: 16,
    color: '#60a5fa',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  changePhoneContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  changePhoneText: {
    fontSize: 16,
    color: '#60a5fa',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
  continueButton: {
    backgroundColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default OTPVerifyScreen;