import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, Button, Chip, TextInput, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppSelector } from '../../store/hooks';
import { CardMeet } from '../landing/components';

const rooms = ['Ruang A', 'Ruang B', 'Ruang C', 'Ruang D'];

const formatDate = (d) => (d ? d.toLocaleDateString() : '');

const FindMeeting = ({ onSearch }) => {
  const [room, setRoom] = useState('');
  const [menuRoom, setMenuRoom] = useState(false);
  const {meetings} = useAppSelector(state => state.meeting)
  const [datas, setDatas] = useState([...meetings])
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = () => {
    const payload = {
      room: room || null,
      date: date?.toISOString() || null,
    };
    setDatas(prev => {
      return prev.filter(x => x.nama_ruangan === payload.room)
    })
    if (onSearch) onSearch(payload);
    else console.log('FindMeeting filter:', payload);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Filter Room */}
      <Menu
        visible={menuRoom}
        onDismiss={() => setMenuRoom(false)}
        anchor={
          <TextInput
            label="Ruang Meeting"
            value={room}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="menu-down" onPress={() => setMenuRoom(true)} />}
            style={styles.field}
            onPressIn={() => setMenuRoom(true)}
          />
        }
      >
        {rooms.map((r) => (
          <Menu.Item key={r} onPress={() => { setRoom(r); setMenuRoom(false); }} title={r} />
        ))}
      </Menu>

      {/* Filter Date */}
      <TextInput
        label="Tanggal Meeting"
        value={formatDate(date)}
        mode="outlined"
        editable={false}
        right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
        style={styles.field}
        onPressIn={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selected) => {
            setShowDatePicker(false);
            if (selected) {
              const d = new Date(selected);
              d.setHours(0, 0, 0, 0);
              setDate(d);
            }
          }}
        />
      )}

      <Button  style={styles.button} onPress={handleSearch}>
        Cari
      </Button>

      {/* DI SINI TEMPAT RESULT DARI API NANTI */}
      <View style={styles.placeholder}>
        <ScrollView>
          {datas.map((x, id) => <CardMeet key={id} startTime={x?.waktu_mulai} endTime={x?.waktu_selesai} desc={x?.nama_ruangan || '-'} />)}
          {/* <CardMeet startTime="09:00" endTime="10:00" desc="Meeting with John" /> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default FindMeeting;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  field: {
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
  },
  section: {
    marginTop: 20,
    marginBottom: 8,
  },
  placeholder: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});
