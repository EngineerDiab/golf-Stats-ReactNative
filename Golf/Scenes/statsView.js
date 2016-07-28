import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import Slider from 'react-native-slider';
//var Button = require('react-native-button');
import Button from 'apsl-react-native-button';
import realm from './realm';


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
      par: 3,
      roundValue: '1',
      holeNumber: 1,
      fullStroke: 0,
      halfStroke: 0,
      puts: 0,
      penalties:0,
      firstPutDistance:0,
      fairway:'On',
      gir: true
    };
  }

  _getDate(){
    var today1 = new Date();
    var dd = today1.getDate();
    var mm = today1.getMonth()+1; //January is 0!
    var yyyy = today1.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today1 = mm+'/'+dd+'/'+yyyy;
    today = today1.toString();
    return today
    }

    _createdID(){
      return(this._getDate() + '-' + this.state.roundValue + '-' + this.state.holeNumber.toString())
    }

    _getGIR(){
      if((this.state.par == 3 && this.state.fullStroke + this.state.halfStroke <= 1) || (this.state.par == 4 && this.state.fullStroke + this.state.halfStroke <= 2) || (this.state.par == 5 && this.state.fullStroke + this.state.halfStroke <= 3)){
        return true
      }
      else{
        return false
      }
    }

  _handlePress(){
    var _getDatesInHoles = function(object, index, collection){
      if(object.date === this._getDate()){
        return false
      }
      else{
        return true
      }
    }
    if(realm.objects('Hole').slice('0').map(_getDatesInHoles, this).indexOf(false) == -1 === false){
      this.state.roundValue = realm.objects('Round').slice('0')[0].roundNumber.toString()
    } else{
      this.state.roundValue = '1'
      realm.write(() => {
        let round = realm.create('Round', {
          id: 1,
          roundNumber: 1,
        }, true);
      })
    }
    realm.write(() => {
      let hole = realm.create('Hole', {
        id: this._createdID(),
        date: this._getDate(),
        par: this.state.par,
        round: this.state.roundValue,
        holeID:  this.state.holeNumber,
        fullStroke: this.state.fullStroke,
        halfStroke: this.state.halfStroke,
        puts: this.state.puts,
        firstPutDistance: this.state.firstPutDistance,
        penalties: this.state.penalties,
        fairway: this.state.fairway,
        gir: this._getGIR()
      }, true);
    })

    alert('Stats saved!')
    console.log(this._getGIR())
    Actions.pop();
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
          minimumValue={3}
          maximumValue={5}
          value={3}
          step={1}
          minimumTrackTintColor='#1fb28a'
          maximumTrackTintColor='#d3d3d3'
          thumbTintColor='#1a9274'
          onValueChange={(par) => this.setState({par})}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Par: {this.state.par}
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
          minimumValue={1}
          maximumValue={18}
          value={1}
          step={1}
          minimumTrackTintColor='#1fb28a'
          maximumTrackTintColor='#d3d3d3'
          thumbTintColor='#1a9274'
          onValueChange={(holeNumber) => this.setState({holeNumber})}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'normal',
            fontFamily: 'Helvetica Neue',
          }}>
          Hole Number: {this.state.holeNumber}
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
          value={(this.state && this.state.fairway) || 'On'}
          options={['Left', 'On', 'Right']}
          style={{padding: 50}}
          orientation={"horizontal"}
          spacing={10}
          renderItem={(option, active) => (
            <ToggleItem
              option={option}
              active={active}
              onPress={(fairway) => this.setState({fairway})}
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
        style={{backgroundColor: '#058CFA', borderColor: 'white'}}
        textStyle={{color: 'white'}}
        onPress={this._handlePress.bind(this)}
        >
        Save Stats for hole {this.state.holeNumber}
      </Button>
      </View>

  )
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop:64,
    margin: 20,
    flex: 1
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
