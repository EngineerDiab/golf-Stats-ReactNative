import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
import Button from 'apsl-react-native-button';
import {PieChart} from 'react-native-ios-charts';
var _ = require('lodash');
import realm from './realm';

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from 'react-native'

export default class statsViewOverview extends Component {

  constructor (props) {
  super(props);
  this.state = {
    round: Actions.round,
    date: Actions.date,
    // dataSource: ds.cloneWithRows({})
    };
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  _calculateGIRPercentage(){
    var GIRArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0')
    var trueCounter = 0
    var falseCounter =0
    for(var i=0; i < GIRArray.length; i++){
      if(GIRArray[i].gir === true){
        trueCounter++
      }
      else{
        falseCounter++
      }
    }
    //console.log(GirArray.length)
    return ((trueCounter/GIRArray.length)*100)
  }


  render() {
    var valueGIR = this._calculateGIRPercentage()

    const config = {
      dataSets: [{
        values: [valueGIR,100-valueGIR],
        colors: ['#F27852', '#1a9274'],
        //label: 'GIR'
      }],
      backgroundColor: 'transparent',
      //labels: ['GIR']
    };
    return (
      <ScrollView style={styles.container1}>
        <View style={styles.containerRow}>
          <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
            <View>
              <Text style={{color: '#ea5b1c', fontSize: 24}}>{Math.round(valueGIR)}%</Text>
            </View>
            <View>
              <Text style={{color: '#1a9274', fontSize: 24}}>{Math.round(100-valueGIR)}%</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <View style={{alignSelf: 'center'}}>
              <PieChart config={config} style={styles.chart}/>
            </View>
          </View>
        </View>
        <View style={styles.seperator}>
        </View>
        <View style={styles.containerRow}>
          <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
            <View>
              <Text style={{color: '#ea5b1c', fontSize: 24}}>{Math.round(valueGIR)}%</Text>
            </View>
            <View>
              <Text style={{color: '#1a9274', fontSize: 24}}>{Math.round(100-valueGIR)}%</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <View style={{alignSelf: 'center'}}>
              <PieChart config={config} style={styles.chart}/>
            </View>
          </View>
        </View>
        <View style={styles.seperator}>
        </View>
        <View style={styles.containerRow}>
          <View style={{flexDirection:'row', justifyContent: 'space-around'}}>
            <View>
              <Text style={{color: '#ea5b1c', fontSize: 24}}>{Math.round(valueGIR)}%</Text>
            </View>
            <View>
              <Text style={{color: '#1a9274', fontSize: 24}}>{Math.round(100-valueGIR)}%</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <View style={{alignSelf: 'center'}}>
              <PieChart config={config} style={styles.chart}/>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  chart: {
    width:300,
    height: 300,
    backgroundColor: 'transparent',
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'stretch',

  },
  container1: {
    marginTop:65,
    flexDirection: 'column',
    flex: 1,
    //backgroundColor: '#fff'
  },
  containerRow: {
    flexDirection: 'column',
    flex: 1,
    borderColor: '#1a9274',
    //borderWidth: 3,
    padding: 10,
    margin:10
    //backgroundColor: '#fff'
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC",
    margin: 15
  }
})
