import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useAppSelector } from '../../hooks/useStore';
import { useNavigation } from '@react-navigation/native';
const gifAnimationTime = 7500
const SplashScreen = () => {
    const navigation:any = useNavigation();
    const { token } = useAppSelector(state =>state.auth)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Splash screen render--->');
      
            if(token){
            navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
            }); 
        }else{
            navigation.navigate('LoginScreen')
        }

    
    }, gifAnimationTime); 

    return () => clearTimeout(timer);
  }, [navigation, token]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/splash.gif')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
