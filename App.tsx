import React from 'react'
import { View, Dimensions, Text } from 'react-native'

import Pager from './src/Pager'

const { width, height } = Dimensions.get('window')
const data = [
  {
    title: '1'
  },
  {
    title: '2'
  },
  {
    title: '3'
  },
  {
    title: '4'
  },
  {
    title: '5'
  },
  {
    title: '6'
  },
  {
    title: '7'
  },
]

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Pager
        horizontal={true}
        width={width}
        height={512}
        initialIndex={3}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {
          data.map((item, index) => {
            return (
              <View
                key={'key' + index}
                style={{
                  height: 512,
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                }}>
                <Text style={{
                  color: 'white',
                  fontSize: 21,
                  fontWeight: 'bold'
                }}>
                  {item.title}
                </Text>
              </View>
            )
          })
        }
      </Pager>
    </View >
  )
}

export default App
