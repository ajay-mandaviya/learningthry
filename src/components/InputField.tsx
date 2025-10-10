import {
  View,
  Text,
  TextInput,
  TextStyle,
  TextInputProps,
  ViewStyle,
  Platform,
  Pressable,
} from 'react-native';
import React, { forwardRef, JSX } from 'react';

type Props = {
  label?: string;
  isRequire?: boolean;
  placeholder: string;
  labelStyle?: TextStyle;
  error?: string;
  errorTextStyle?: TextStyle;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onInputContainerPress?: () => void;
  inputViewStyle?: ViewStyle | ViewStyle[] | undefined;
  password?: boolean;
  style?: any;
  disabled?: boolean;
} & TextInputProps;

const InputField = forwardRef<TextInput, Props>(
  (
    {
      label,
      isRequire,
      placeholder,
      labelStyle,
      error,
      leftIcon,
      rightIcon,
      inputViewStyle,
      errorTextStyle,
      style,
      onInputContainerPress,
      ...props
    },
    ref
  ) => {
    return (
      <View style={{ gap: 8 }}>
        {label ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[{ fontSize: 16 }, labelStyle]}>{label}</Text>
            {isRequire ? (
              <Text style={{ color: '#dc2626', fontSize: 16 }}>*</Text>
            ) : null}
          </View>
        ) : null}
        <Pressable
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#d1d5db',
              backgroundColor: 'white',
              paddingHorizontal: 10,
              height: 56,
            },
            inputViewStyle,
          ]}
          onPress={onInputContainerPress}
        >
          {leftIcon ? leftIcon : null}
          <View style={{ flex: 1 }}>
            <TextInput
              ref={ref}
              secureTextEntry={props.password}
              placeholder={placeholder}
              style={[
                {
                  height: '100%',
                  color: 'black',
                  textAlignVertical: 'center',
                  lineHeight: Platform.OS === 'ios' ? 0 : undefined,
                  paddingTop: Platform.OS === 'ios' ? 0 : undefined,
                  fontSize: 16,
                },
                style,
              ]}
              placeholderTextColor="#9CA3AF"
              {...props}
            />
          </View>
          {rightIcon ? rightIcon : null}
        </Pressable>
        <Text style={[{ color: '#dc2626', fontSize: 12 }, errorTextStyle]}>
          {error || ''}
        </Text>
      </View>
    );
  }
);

export default InputField;
