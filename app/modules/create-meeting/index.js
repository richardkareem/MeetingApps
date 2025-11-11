import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  Chip,
  HelperText,
  Menu,
  Text,
  TextInput,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { addMeeting } from '../../store/slices/meetingSlice';
import {toHHMM} from '../../service/utils'
const divisions = ['Engineering', 'HR', 'Finance', 'Marketing'];
const rooms = ['Ruang A', 'Ruang B', 'Ruang C', 'Ruang D'];

const formatDate = (d) =>
  d ? d.toLocaleDateString() : '';
const formatTime = (d) =>
  d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

const CreateMeeting = () => {
  const [division, setDivision] = useState('');
  const [room, setRoom] = useState('');
  const navigation = useNavigation()

  const dispatch = useAppDispatch()
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [participants, setParticipants] = useState('');

  // menu states
  const [menuDiv, setMenuDiv] = useState(false);
  const [menuRoom, setMenuRoom] = useState(false);

  // picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onSubmit = (param) => {
    dispatch(addMeeting(param))
    navigation.goBack()
  }

  const errors = useMemo(() => {
    const e = {};
    if (!division) e.division = 'Wajib pilih divisi.';
    if (!room) e.room = 'Wajib pilih ruang meeting.';
    if (!date) e.date = 'Wajib pilih tanggal.';
    if (!startTime) e.start = 'Wajib pilih waktu mulai.';
    if (!endTime) e.end = 'Wajib pilih waktu selesai.';
    // end time after start time
    if (startTime && endTime && endTime <= startTime) {
      e.end = 'Waktu selesai harus setelah waktu mulai.';
    }
    const n = Number(participants);
    if (!participants) e.participants = 'Wajib diisi.';
    else if (!Number.isInteger(n) || n <= 0) e.participants = 'Harus angka > 0.';
    return e;
  }, [division, room, date, startTime, endTime, participants]);

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) return;
    const payload = {
      division,
      room,
      date: date?.toISOString(),
      startTime: startTime?.toISOString(),
      endTime: endTime?.toISOString(),
      participants: Number(participants),
    };
    
    onSubmit({waktu_mulai:toHHMM(startTime), waktu_selesai: toHHMM(endTime), nama_ruangan: room})
  };

  // helpers to open pickers with initial default
  const ensureDateBase = () => date ?? new Date();
  const ensureTimeBase = (base) => {
    const d = base ?? new Date();
    if (!date) return d;
    // merge selected date with time from d
    const merged = new Date(date);
    merged.setHours(d.getHours(), d.getMinutes(), 0, 0);
    return merged;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Menu
          visible={menuDiv}
          onDismiss={() => setMenuDiv(false)}
          anchor={
            <TextInput
              label="Divisi"
              value={division}
              mode="outlined"
              editable={false}
              right={<TextInput.Icon icon="menu-down" onPress={() => setMenuDiv(true)} />}
              style={styles.field}
              error={!!errors.division}
              onPressIn={() => setMenuDiv(true)}
            />
          }
        >
          {divisions.map((d) => (
            <Menu.Item
              key={d}
              onPress={() => {
                setDivision(d);
                setMenuDiv(false);
              }}
              title={d}
            />
          ))}
        </Menu>
        <HelperText type="error" visible={!!errors.division}>
          {errors.division}
        </HelperText>

        {/* Room */}
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
              error={!!errors.room}
              onPressIn={() => setMenuRoom(true)}
            />
          }
        >
          {rooms.map((r) => (
            <Menu.Item
              key={r}
              onPress={() => {
                setRoom(r);
                setMenuRoom(false);
              }}
              title={r}
            />
          ))}
        </Menu>
        <HelperText type="error" visible={!!errors.room}>
          {errors.room}
        </HelperText>

        {/* Date */}
        <TextInput
          label="Tanggal Meeting"
          value={formatDate(date)}
          mode="outlined"
          editable={false}
          right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
          style={styles.field}
          error={!!errors.date}
          onPressIn={() => setShowDatePicker(true)}
        />
        <HelperText type="error" visible={!!errors.date}>
          {errors.date}
        </HelperText>
        {showDatePicker && (
          <DateTimePicker
            value={ensureDateBase()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowDatePicker(false);
              if (selected) {
                // normalize selected date to 00:00
                const d = new Date(selected);
                d.setHours(0, 0, 0, 0);
                setDate(d);
                // also re-merge any times with this new date
                if (startTime) setStartTime(ensureTimeBase(startTime));
                if (endTime) setEndTime(ensureTimeBase(endTime));
              }
            }}
          />
        )}

        {/* Start Time */}
        <TextInput
          label="Waktu Mulai"
          value={formatTime(startTime)}
          mode="outlined"
          editable={false}
          right={<TextInput.Icon icon="clock-outline" onPress={() => setShowStartPicker(true)} />}
          style={styles.field}
          error={!!errors.start}
          onPressIn={() => setShowStartPicker(true)}
        />
        <HelperText type="error" visible={!!errors.start}>
          {errors.start}
        </HelperText>
        {showStartPicker && (
          <DateTimePicker
            value={ensureTimeBase(startTime)}
            mode="time"
            is24Hour
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowStartPicker(false);
              if (selected) {
                const merged = ensureTimeBase(selected);
                setStartTime(merged);
              }
            }}
          />
        )}

        {/* End Time */}
        <TextInput
          label="Waktu Selesai"
          value={formatTime(endTime)}
          mode="outlined"
          editable={false}
          right={<TextInput.Icon icon="clock-outline" onPress={() => setShowEndPicker(true)} />}
          style={styles.field}
          error={!!errors.end}
          onPressIn={() => setShowEndPicker(true)}
        />
        <HelperText type="error" visible={!!errors.end}>
          {errors.end}
        </HelperText>
        {showEndPicker && (
          <DateTimePicker
            value={ensureTimeBase(endTime)}
            mode="time"
            is24Hour
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowEndPicker(false);
              if (selected) {
                const merged = ensureTimeBase(selected);
                setEndTime(merged);
              }
            }}
          />
        )}

        {/* Participants */}
        <TextInput
          label="Jumlah Peserta"
          value={participants}
          mode="outlined"
          keyboardType="number-pad"
          right={<TextInput.Icon icon="account-multiple-outline" />}
          style={styles.field}
          error={!!errors.participants}
          onChangeText={setParticipants}
        />
        <HelperText type="error" visible={!!errors.participants}>
          {errors.participants}
        </HelperText>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit}
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateMeeting;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  field: {
    marginBottom: 6,
  },
  button: {
    marginTop: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  note: {
    marginTop: 8,
    opacity: 0.7,
    fontSize: 12,
  },
});
