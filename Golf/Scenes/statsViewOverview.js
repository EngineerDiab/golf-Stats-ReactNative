import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
import Button from 'apsl-react-native-button';
import {PieChart, HorizontalBarChart} from 'react-native-ios-charts';
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

  _calculateScoringMarkers(){
    var getArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0')
    var scoringMarkerArray = [0,0,0,0,0,0,0]
    for(var i=0; i < getArray.length; i++){
       var theValue = getArray[i].par - (getArray[i].fullStroke + getArray[i].halfStroke + getArray[i].puts + getArray[i].penalties)
       console.log(theValue)
       switch(theValue){
           case 2:
              scoringMarkerArray[0]++;
              break;
           case 1:
              scoringMarkerArray[1]++;
              break;
           case 0:
              scoringMarkerArray[2]++;
              break;
           case -1:
              scoringMarkerArray[3]++;
              break;
           case -2:
              scoringMarkerArray[4]++;
              break;
           case -3:
              scoringMarkerArray[5]++;
              break;
           default:
              scoringMarkerArray[6]++;
        }
      }
      console.log(scoringMarkerArray)
      return scoringMarkerArray
  }

    _calculateScoringAverage(parValue){
      var getArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND par== ${parValue}`).slice('0')
      var total = 0
      for(var i=0; i < getArray.length; i++){
        total = total + getArray[i].fullStroke + getArray[i].halfStroke + getArray[i].puts + getArray[i].penalties
      }
      console.log(total/getArray.length)
      return (total/getArray.length)
    }

    _calculateAvgHoleProx(){
      var getArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0')
      var total = 0
      for(var i=0; i < getArray.length; i++){
        total = total + getArray[i].firstPutDistance
      }
      console.log(total/getArray.length)
      return (total/getArray.length)
    }

    _calculatePutsPerRound(){
      var getArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0')
      var total = 0
      for(var i=0; i < getArray.length; i++){
        total = total + getArray[i].puts
      }
      console.log(total)
      return (total)
    }

    _calculateNumberOf123Puts(putValue){
      return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND par== ${putValue}`).slice('0').length)
    }

    _calculateUpAndDown(){
      return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND halfStroke >= ${1} AND puts==${1}`).slice('0').length)
    }



  render() {
    //Scoring Average
    var valueSCM = this._calculateScoringMarkers()
    var scoringAvg3 = this._calculateScoringAverage(3)
    var scoringAvg4 = this._calculateScoringAverage(4)
    var scoringAvg5 = this._calculateScoringAverage(5)
    //Accuracy
    var valueGIR = this._calculateGIRPercentage()
    var avgHoleProx = this._calculateAvgHoleProx()
    //Putting
    var totalPutsPerRound = this._calculatePutsPerRound()
    var totalPutsPerRoundAvg = totalPutsPerRound/realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0').length
    var zeroPuts = this._calculateNumberOf123Puts(0)
    var onePuts = this._calculateNumberOf123Puts(1)
    var twoPuts = this._calculateNumberOf123Puts(2)
    var threePuts = this._calculateNumberOf123Puts(3)
    var overPuts = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0').length - (zeroPuts+onePuts+twoPuts+threePuts)
    //Up and Down
    var upAndDown = this._calculateUpAndDown()
    console.log(upAndDown)

    const configGIR = {
      dataSets: [{
        values: [valueGIR,100-valueGIR],
        colors: ['#F27852', '#1a9274'],
        //label: 'GIR'
      }],
      backgroundColor: 'transparent',
      pinchZoomEnabled: false,
      doubleTapToZoomEnabled: false,
      //labels: ['GIR']
      //drawHoleEnabled: true,
      // centerText: 'GIR',
      // drawSliceTextEnabled: false,
      usePercentValuesEnabled: true,
      maxAngle: 360
    };
    const configSCM = {
      dataSets: [{
        values: [0,1,2,3,4,5,18],
        valueTextFontSize: 12
      }],
      backgroundColor: 'transparent',
      pinchZoomEnabled: false,
      doubleTapToZoomEnabled: false,
      labels: ['Eagle', 'Birdie', 'Par', 'Bogie', 'Double Bogie', 'Triple Bogie', 'Quad+'],
      showLegend: false,
      minOffset: 20,
      xAxis: {
        axisLineWidth: 0,
        position: 'bottom'
      },
      leftAxis: {
        spaceTop: 0.18,
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      }
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
              <PieChart config={configGIR} style={styles.chart}/>
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
              <HorizontalBarChart config={configSCM} style={styles.chart}/>
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
              <PieChart config={configSCM} style={styles.chart}/>
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
