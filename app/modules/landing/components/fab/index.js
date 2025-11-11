import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useAppDispatch } from '../../../../store/hooks';
import { logoutUser } from '../../../../store/slices/authSlice';

const Fab = () => {
    const [isOpen, setOpen] = React.useState(false)
    const dispatch = useAppDispatch()
    const onStateChange = ({ open }) => {
        setOpen(open)
    }
    const navigation = useNavigation();

    const nav = (route) => {
        navigation.navigate(route)
    }

    const onLogout = () => {
        dispatch(logoutUser())
        navigation.dispatch(StackActions.replace('Login'))
    }

    return(<FAB.Group
        open={isOpen}
        visible
        actions={[
            {
            icon: 'star',
            label: 'Logout',
            onPress: ()=> onLogout(),
            },
            {
            icon: 'star',
            label: 'Book',
            onPress: () => nav('CreateMeeting'),
            },
            {
            icon: 'bell',
            label: 'Find',
            onPress: () => nav('FindMeeting'),
            },
        ]}
        icon="plus"
        style={styles.fab}
        onStateChange={onStateChange}
        onPress={() => setOpen(prev => !prev)}
      />)
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

export default Fab;