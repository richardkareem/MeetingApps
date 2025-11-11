import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import { Ava, CardMeet, Fab  } from './components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMeetings } from '../../store/slices/meetingSlice';
const Landing = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth);
  const {meetings} = useAppSelector(state => state.meeting)

  useEffect(() => {
    dispatch(fetchMeetings())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <Ava 
        name={user?.name || 'Yosi'} 
        size={100} 
        role={user?.role || 'Web Developer'}
        showInfo={true}
      />
      <Text style={styles.text}>Jadwal Meeting Hari Ini</Text>
      <ScrollView>
        {meetings.map((x, id) => <CardMeet key={id} startTime={x?.waktu_mulai} endTime={x?.waktu_selesai} desc={x?.nama_ruangan || '-'} />)}
        {/* <CardMeet startTime="09:00" endTime="10:00" desc="Meeting with John" /> */}
      </ScrollView>
      <Fab  />
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
    letterSpacing: 0.5,  
    marginTop:16  
  }
});

