import React from 'react'
import { View, Text } from 'react-native'

export default function tabs(props) {

  console.debug('Tabs: ', props.selectedIndex)
  return (
    <View style={{
      width: props.width,
      height: 32,
      backgroundColor: 'green',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {
        props.tabs.map((tab, index) => {
          return (
            <View style={{
              paddingHorizontal: 8,
            }}>
              <Text style={{
                color: props.selectedIndex === index ? 'white' : 'gray'
              }}>
                {tab}
              </Text>
            </View>
          )
        })
      }
    </View>
  )
}