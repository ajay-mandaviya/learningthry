import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

interface OTPInputProps {
  numberOfDigits?: number;
  onFilled?: (otp: string) => void;
  onTextChange?: (otp: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: any;
  focusColor?: string;
  hideStick?: boolean;
  placeholder?: string;
  blurOnFilled?: boolean;
  type?: 'numeric' | 'alphanumeric';
  secureTextEntry?: boolean;
  focusStickBlinkingDuration?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  textInputProps?: any;
  textProps?: any;
  theme?: any;
}

const OTPInputComponent: React.FC<OTPInputProps> = ({
  numberOfDigits = 6,
  onFilled,
  onTextChange,
  disabled = false,
  autoFocus = true,
  style,
  focusColor = '#60a5fa',
  hideStick = true,
  placeholder = '******',
  blurOnFilled = true,
  type = 'numeric',
  secureTextEntry = false,
  focusStickBlinkingDuration = 500,
  onFocus,
  onBlur,
  textInputProps,
  textProps,
  theme,
}) => {
  return (
    <View style={[styles.container, style]}>
      <OtpInput
        numberOfDigits={numberOfDigits}
        focusColor={focusColor}
        autoFocus={autoFocus}
        hideStick={hideStick}
        placeholder={placeholder}
        blurOnFilled={blurOnFilled}
        disabled={disabled}
        type={type}
        secureTextEntry={secureTextEntry}
        focusStickBlinkingDuration={focusStickBlinkingDuration}
        onFocus={onFocus}
        onBlur={onBlur}
        onTextChange={onTextChange}
        onFilled={onFilled}
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
          ...textInputProps,
        }}
        textProps={{
          accessibilityRole: 'text',
          accessibilityLabel: 'OTP digit',
          allowFontScaling: false,
          ...textProps,
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          placeholderTextStyle: styles.placeholderText,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
          disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
          ...theme,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pinCodeContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#374151',
    backgroundColor: 'rgba(17, 24, 39, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  pinCodeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  focusStick: {
    width: 2,
    height: 30,
    backgroundColor: '#60a5fa',
  },
  activePinCodeContainer: {
    borderColor: '#60a5fa',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6b7280',
  },
  filledPinCodeContainer: {
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledPinCodeContainer: {
    borderColor: '#4b5563',
    backgroundColor: 'rgba(75, 85, 99, 0.3)',
    opacity: 0.5,
  },
});

export default OTPInputComponent;
