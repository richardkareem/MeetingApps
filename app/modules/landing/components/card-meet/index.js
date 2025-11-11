import { Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const CardMeet = ({startTime, endTime, desc}) => {
  return (
    <View style={styles.container}>
        <View style={styles.row}>
            <Text>{startTime}</Text>
            <Text style={styles.strip}>-</Text>
            <Text>{endTime}</Text>
        </View>
      <Text>{desc}</Text>
    </View>
  )
}

export default CardMeet

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row:{
    flexDirection:'row',
    marginRight: 16
  },
  strip:{
    marginRight:2,
    marginLeft:2
  }
})