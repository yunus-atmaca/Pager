import React from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'

const { width, height } = Dimensions.get('window')

const MIN_DISTANCE_FOR_FLING = 50

interface PagerProps {
  horizontal: boolean
  width?: number,
  height?: number,
  initialIndex?: number,
  showsHorizontalScrollIndicator?: boolean,
  showsVerticalScrollIndicator?: boolean,
  onPageSelected?: Function
}

class Pager extends React.Component<PagerProps, any>{
  scrollViewRef: any
  isScrolling: boolean

  lastMotion: number

  selectedOffset: any
  selectedPage: number

  constructor(props) {
    super(props)

    this.state = this._initialState()

    this.isScrolling = false
    this.selectedPage = this.state.initialIndex
    this.lastMotion = 0
    this.selectedOffset = {}
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
    if (this.props !== prevProps) {
      this.setState(this._initialState(), () => {
        this.isScrolling = false
        this.selectedPage = this.state.initialIndex
        this.lastMotion = 0

        this._scrollToIndex(this.selectedPage, false)
      })
    }
  }

  _onMomentumScrollEnd = (e) => {
    console.debug('_onMomentumScrollEnd')
    if (this.state.horizontal) {
      if (Math.floor(this.selectedOffset.x) === Math.floor(e.nativeEvent.contentOffset.x)) {
        //console.log('Horizontal-Selected-Page: ')
        this.props.onPageSelected && this.props.onPageSelected(this.selectedPage)
      }
    } else {
      if (Math.floor(this.selectedOffset.y) === Math.floor(e.nativeEvent.contentOffset.y)) {
        //console.log('Vertical-Selected-Page: ')
        this.props.onPageSelected && this.props.onPageSelected(this.selectedPage)
      }
    }
  }

  _onScroll = (e) => {
    //console.debug('_onScroll')
  }

  _onScrollBeginDrag = (e) => {
    //console.debug('_onScrollBeginDrag')
    this.isScrolling = true

    this.lastMotion = this.state.horizontal ?
      e.nativeEvent.contentOffset.x : e.nativeEvent.contentOffset.y
  }

  _onScrollEndDrag = (e) => {
    //console.debug('_onScrollEndDrag')
    this.isScrolling = false

    let motion = this.state.horizontal ?
      (e.nativeEvent.contentOffset.x - this.lastMotion)
      :
      (e.nativeEvent.contentOffset.y - this.lastMotion)

    this._computePagerOffset(motion)
  }

  _computePagerOffset = (motion) => {
    if (Math.abs(motion) > MIN_DISTANCE_FOR_FLING) {
      this.selectedPage = motion > 0 ?
        (this.selectedPage + 1)
        :
        (this.selectedPage - 1)
    }

    this._scrollToIndex(this.selectedPage, true)
  }

  _scrollToIndex = (index, animated) => {
    let x = this.state.horizontal ? this.state.width * index : 0
    let y = this.state.horizontal ? 0 : this.state.height * index

    this.selectedOffset = {
      x: x,
      y: y,
    }
    this.scrollViewRef.scrollTo({
      x: x,
      y: y,
      animated: animated
    })
  }
  _onPageSelected = (page) => {
    //console.debug('Selected Page: ', page)
  }

  _onLayout = (event) => {
    if (this.state.initialIndex !== 0) {
      this._scrollToIndex(this.state.initialIndex, false)
    }
  }

  render() {
    return (
      <View style={[styles.container,
      {
        width: this.state.width,
        height: this.state.height
      }]}>
        <ScrollView
          onLayout={this._onLayout}
          ref={ref => this.scrollViewRef = ref}
          {...this.props}
          onMomentumScrollEnd={this._onMomentumScrollEnd}
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