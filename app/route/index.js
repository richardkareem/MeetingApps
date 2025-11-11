// In App.js in a new project

import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Greet, Login, Landing, FindMeeting, CreateMeeting } from '../modules';

const RootStack = createNativeStackNavigator({
    screenOptions:{
        headerShown: false,
        
    },
    screens: {
        Greet,
        Login,
        Landing,
        FindMeeting:{
            screen:FindMeeting,
            options:{
                headerShown:true,
                title: 'Jadwal Ruang Meeting',
                headerBackTitle: 'Back'
            }
        },
        CreateMeeting:{
            screen:CreateMeeting,
            options:{
                headerShown:true,
                title:'Jadwal Ruang Meeting',
                headerBackTitle: 'Back'
            }
        }
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function Route() {
  return <Navigation />;
}