/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo,  } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
 
  Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { getTournaments } from '../../services/otpService';
import { TournamentCard } from '../../components';
import { logout } from '../../redux/auth.slice';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation:any = useNavigation()
  const user = useAppSelector((state) => state.auth);
  const userInitial = user.user?.name ? user?.user?.name?.charAt(0).toUpperCase() : 'P'; 
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [segment, setSegment] = useState('All');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
 

  const fetchTournaments = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res:any = await getTournaments(page, 20);
      const items = Array.isArray(res) ? res : res.response || [];
      setData((prev) => [...prev, ...items]);
      setHasMore(items.length === 20); 
    } catch (err: any) {
      Alert.alert('' ,err?.message || 'Failed to fetch tournaments');
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => { 
    dispatch(logout()); 
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
  });    
  };

  const handleProfilePress = () => {
    Alert.alert(
      'Profile', 
      'Choose an action', 
      [
        { text: 'Cancel', style: 'cancel' }, 
        {
          text: 'Logout',
          style: 'destructive', 
          onPress: () => handleLogout(), 
        },
      ],
      { 
        cancelable: true, 
        userInterfaceStyle: 'dark', 
      }
    );
  };

 
  useEffect(() => {
    fetchTournaments();
  }, [page]);


  const filteredData = useMemo(() => {
    if (segment === 'All') return data;
    return data.filter((t) => t.status === 'ongoing');
  }, [data, segment]);


  const handleLoadMore = () => {
    if (loading || !hasMore) return;
    if (filteredData.length >= 11) {
      setPage((p) => p + 1);
    }
  };


  const renderFooter = () =>
    loading ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#4E9FFF" />
      </View>
    ) : null;


  

  if (!loading && filteredData.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No tournaments available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
     
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        {['All', 'Ongoing'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.segmentBtn, segment === tab && styles.activeSegment]}
            onPress={() => setSegment(tab)}
          >
            <Text
              style={[
                styles.segmentText,
                segment === tab && styles.activeSegmentText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
         <View style={styles.header}>
           <TouchableOpacity 
             onPress={handleProfilePress}
             style={styles.profileIconContainer}
             activeOpacity={0.7} 
           >
             <View style={styles.profileIcon}>
               <Text style={styles.profileText}>{userInitial}</Text>
             </View>
           </TouchableOpacity>
         </View>
      </View>

     
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <TournamentCard item={item} />}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

