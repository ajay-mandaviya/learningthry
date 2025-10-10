import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

type Props = {
  btnText: string;
  disabled?: boolean;
  onPress?: () => void;
  isLoading?: boolean;
  startIcon?: any;
  endIcon?: any;
  btnTextStyle?: TextStyle;
  btnViewStyle?: ViewStyle;
  variant?: 'outlined' | 'contained';
};

const Button: React.FC<Props> = ({
  btnText,
  endIcon,
  onPress,
  disabled,
  startIcon,
  isLoading,
  btnTextStyle,
  btnViewStyle,
  variant = 'contained',
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      padding: 16,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (variant === 'contained') {
      return {
        ...baseStyle,
        backgroundColor: '#0f766e', 
      };
    } else {
      return {
        ...baseStyle,
        borderWidth: 1,
        borderColor: '#0f766e',
        backgroundColor: 'white',
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: '600',
    };

    if (variant === 'contained') {
      return {
        ...baseStyle,
        color: 'white',
      };
    } else {
      return {
        ...baseStyle,
        color: 'black',
      };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      onPress={disabled || isLoading ? () => null : onPress}
      style={[
        getButtonStyle(),
        btnViewStyle,
        disabled ? { backgroundColor: '#aeaeae' } : {},
      ]}
    >
      {isLoading ? (
        <>
          <ActivityIndicator size="small" color="#FFFFFF" />
          <Text style={{ color: 'white', marginLeft: 8 }}>Loading...</Text>
        </>
      ) : (
        <>
          {startIcon ? <View style={{ marginRight: 8 }}>{startIcon}</View> : null}
          <Text style={[getTextStyle(), btnTextStyle]} numberOfLines={1}>
            {btnText}
          </Text>
          {endIcon ? <View style={{ marginLeft: 8 }}>{endIcon}</View> : null}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
