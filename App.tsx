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
]

const App = () => {
  let selected
  return (
    <View style={{ flex: 1 }}>
      <Pager
        tabs={[
          'tab1',
          'tab2',
          'tab3',
          'tab4',
          'tab5',
        ]}
        horizontal={true}
        width={width}
        height={256}
        onPageSelected={(index) => {
          console.log(index)
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {
          data.map((item, index) => {
            return (
              <View
                key={'key' + index}
                style={{
                  height: 256,
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
