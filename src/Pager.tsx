import React from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'

const { width, height } = Dimensions.get('window')

const MIN_DISTANCE_FOR_FLING = 50

interface PagerProps {
  horizontal: boolean
  width?: number,
  height?: number,
  initialIndex?: number,
  showsHorizontalScrollIndicator?: boolean,
  showsVerticalScrollIndicator?: boolean,
}

class Pager extends React.Component<PagerProps, any>{
  scrollViewRef: any
  isScrolling: boolean

  lastMotion: number
  selectedPage: number

  constructor(props) {
    super(props)

    this.state = this._initialState()

    this.isScrolling = false
    this.selectedPage = this.state.initialIndex
    this.lastMotion = 0

  }

  _initialState = () => {

    let initialState = {
      width: this.props.width || width,
      height: this.props.height || height,
      horizontal: this.props.horizontal,
      initialIndex: this.props.initialIndex || 0
    }

    return initialState
  }

  componentDidMount() {
    //console.debug('componentDidMount')

  }

  componentWillUnmount() {
    //console.debug('componentWillUnmount')

  }

  componentDidUpdate(prevProps) {
    console.debug('componentDidUpdate')

    if (this.props !== prevProps) {
      this.setState({ ...this.props }, () => {
        this.isScrolling = false
        this.selectedPage = this.state.initialIndex
        this.lastMotion = 0

        this._scrollToIndex(this.selectedPage, false)
      })
    }
  }

  _onScroll = (e) => {
    //console.debug('_onScroll')
    //console.log(e.nativeEvent.contentOffset)
  }

  _onScrollBeginDrag = (e) => {
    this.isScrolling = true
    //console.debug('_onScrollBeginDrag')

    //this.lastMotion = e.nativeEvent.contentOffset.

    this.lastMotion = this.state.horizontal ?
      e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y
  }

  _onScrollEndDrag = (e) => {
    this.isScrolling = false

    //console.log(e.nativeEvent.contentOffset)
    //console.log(this.state.horizontal)
    let motion = this.state.horizontal ?
      (e.nativeEvent.contentOffset.x - this.lastMotion)
      :
      (e.nativeEvent.contentOffset.y - this.lastMotion)

    this._computePagerOffset(motion)
  }

  _onMomentumScrollEnd = (e) => {
    console.log('_onMomentumScrollEnd')
  }

  _computePagerOffset = (motion) => {
    //console.debug('_computePagerOffset')
    //console.log(motion)
    let isPageChanged = false
    if (Math.abs(motion) > MIN_DISTANCE_FOR_FLING) {
      this.selectedPage = motion > 0 ?
        (this.selectedPage + 1)
        :
        (this.selectedPage - 1)

      isPageChanged = true
    }

    let x = this.state.horizontal ? this.state.width * this.selectedPage : 0
    let y = this.state.horizontal ? 0 : this.state.height * this.selectedPage

    this.scrollViewRef.scrollTo({
      x: x,
      y: y,
      animated: true
    })

    if (isPageChanged) {
      this._onPageSelected(this.selectedPage)
    }
  }

  _scrollToIndex = (index, animated) => {
    let x = this.state.horizontal ? this.state.width * index : 0
    let y = this.state.horizontal ? 0 : this.state.height * index

    this.scrollViewRef.scrollTo({
      x: x,
      y: y,
      animated: animated
    })
  }
  _onPageSelected = (page) => {
    //console.debug('Selected Page: ', page)
  }

  render() {
    return (
      <View style={[styles.container,
      {
        width: this.state.width,
        height: this.state.height
      }]}>
        <ScrollView
          ref={ref => this.scrollViewRef = ref}
          {...this.props}
          onScroll={this._onScroll}
          onScrollBeginDrag={this._onScrollBeginDrag}
          onScrollEndDrag={this._onScrollEndDrag}>
          {this.props.children}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Pager