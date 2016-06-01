import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
var Button = require('react-native-button');


import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

export default class statsView extends Component {
  constructor () {
  super();
  this.state = {
      fullStroke: 0,
      halfStroke: 0,
      puts: 0,
      penalties:0,
      firstPutDistance:0
    };
  }

  _handlePress(){
    this.setState(this.getInitialState());
    alert('Stats saved!')
    Actions.pop({txt: "hello"})
  }

  render(){
    return(
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}>
          <Slider
            minimumValue={0}
            maximumValue={3}
            step={1}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(fullStroke) => this.setState({fullStroke})}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Full Strokes: {this.state.fullStroke}
          </Text>
          <View style={styles.seperator}></View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}>
          <Slider
            minimumValue={0}
            maximumValue={3}
            step={1}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(halfStroke) => this.setState({halfStroke})}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Half Strokes: {this.state.halfStroke}
          </Text>
        <View style={styles.seperator}></View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}>
          <Slider
            minimumValue={0}
            maximumValue={3}
            step={1}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(puts) => this.setState({puts})}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Puts: {this.state.puts}
          </Text>
        </View>
        <View style={styles.seperator}></View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}>
          <Slider
            minimumValue={0}
            maximumValue={50}
            step={1}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(firstPutDistance) => this.setState({firstPutDistance})}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            First Put Distance: {this.state.firstPutDistance}
          </Text>
          <View style={styles.seperator}></View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}>
          <Slider
            minimumValue={0}
            maximumValue={3}
            step={1}
            minimumTrackTintColor='#1fb28a'
            maximumTrackTintColor='#d3d3d3'
            thumbTintColor='#1a9274'
            onValueChange={(penalties) => this.setState({penalties})}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
              fontFamily: 'Helvetica Neue',
            }}>
            Penalties: {this.state.penalties}
          </Text>
          <View style={styles.seperator}></View>
        </View>
        <ToggleContainer
          value={(this.state && this.state.option) || 'On'}
          options={['Left', 'On', 'Right']}
          style={{padding: 50}}
          orientation={"horizontal"}
          spacing={10}
          renderItem={(option, active) => (
            <ToggleItem
              option={option}
              active={active}
              onPress={() => this.setState({option})}
              color={"rgb(74,144,226)"}
              backgroundColor={"rgb(255,255,255)"}
              borderColor={"rgba(231,231,231,1)"}
              activeColor={"rgba(255,255,255,1)"}
              activeBackgroundColor={"rgb(74,144,226)"}
              borderRadius={7}
            />
          )}
        />
        <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={this._handlePress}
        >
        Save Stats for hole {this.props.holeNumber}
      </Button>
      </View>

  )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop:64,
    margin: 20
    //marginBottom:49
  },
  sliderContainer:{
    //flexDirection: 'row'
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC"

  }
})
