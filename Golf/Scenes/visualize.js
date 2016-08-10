import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
import Button from 'apsl-react-native-button';
import {LineChart} from 'react-native-ios-charts';
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

    _getUniqueRounds(object, index, collection){
      return({'date': object.date, 'round': object.round})
    }

  constructor (props) {
  super(props);
  this.state = {
    roundArray: _.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1).reverse(),
    timeFrame: '5 Rounds',
    // dataSource: ds.cloneWithRows({})
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      roundArray: _.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1).reverse(),
    });

    realm.addListener('change', () => {
      this.setState({
        roundArray: _.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1).reverse()
      });
      console.log(this.state.roundArray)
    });
  }



  _getTotalHoles(date, round){
    return(realm.objects('Hole').filtered(`date == "${date}" AND round == "${round}"`).slice('0').length)
  }

  _getGIRAmount(){
    return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND gir==${true}`).slice('0').length)
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

    _calculateScoringAverage(date, round, parValue){
      var getArray = realm.objects('Hole').filtered(`date == "${date}" AND round == "${round}" AND par== ${parValue}`).slice('0')
      var total = 0
      for(var i=0; i < getArray.length; i++){
        total = total + getArray[i].fullStroke + getArray[i].halfStroke + getArray[i].puts + getArray[i].penalties
      }
      if(getArray.length === 0){
        return 0
      }
      else{
        return (Math.round((total/getArray.length)*100)/100)
      }
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

    _calculatePutsPerRound(date, round){
      var getArray = realm.objects('Hole').filtered(`date == "${date}" AND round == "${round}"`).slice('0')
      var total = 0
      for(var k=0; k < getArray.length; k++){
        total = total + getArray[k].puts
      }
      //console.log(total)
      return (total)
    }

    _calculatePutsPerRoundAvg(date, round){
      var getArray = realm.objects('Hole').filtered(`date == "${date}" AND round == "${round}"`).slice('0')
      var total = 0
      for(var k=0; k < getArray.length; k++){
        total = total + getArray[k].puts
      }
      //console.log(total)
      return (Math.round((total/getArray.length)*100)/100)
    }

    _calculateNumberOf123Puts(putValue){
      return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND par== ${putValue}`).slice('0').length)
    }

    _calculateUpAndDown(date , round){
      return(realm.objects('Hole').filtered(`date == "${date}" AND round == "${round}" AND halfStroke >= ${1} AND puts==${1}`).slice('0').length)
    }

    _calculateTendancy(location){
      return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND fairway == "${location}"`).slice('0').length)
    }

    _getDatesFromRoundArray(){
      var temp = []
      for(var i = 0; i < this.state.roundArray.length; i++){
        temp[i] = this.state.roundArray[i].date
      }
      return temp
    }

    _updateGraphs(timeFrame){
      this.setState({timeFrame})
      console.log(this.state.timeFrame)
    }

    _getTimeFrame(){
      if(this.state.timeFrame === "5 Rounds" && this.state.roundArray.length >= 5){
        return 5
      }
      if(this.state.timeFrame === "10 Rounds" && this.state.roundArray.length >= 10){
        return 10
      }
      else{
        return this.state.roundArray.length
      }
    }

    _getTimeFrameForCircles(){
      if(this._getTimeFrame() <= 10){
        return true
      }
      else{
        return false
      }
    }

    _getLowest(arr){
      var min=0
      for(var i = 0; i < arr.length; i++){
        var a = arr[i]
        if(a < min){
          min = a
        }
      }
      return min
    }

    _getHighest(arr){
      var max=0
      for(var i = 0; i < arr.length; i++){
        var a = arr[i]
        if(a > max){
          max = a
        }
      }
      return max
    }

    _getLowestHighest(arr){
      var max=0
      var min=0
      for(var i = 0; i < arr.length; i++){
        var a = arr[i]
        if(a > max){
          max = a
        }
        if(a < min){
          min = a
        }
      }
      return (max - min)
    }

    _getArrAvg(arr){
      var sum = 0
      for(var i = 0; i < arr.length; i++){
        sum = sum + arr[i]
      }
      if(arr.length === 0){
        return 0
      }
      else{
        return (Math.round((sum/arr.length)*100)/100)
      }
    }

    //StartingOverallCalculations
    _calculateParAverageArray(timeFrameValue, parVal){
      var avgArray = []
      for(var i = 0; i < timeFrameValue; i++){
        avgArray[i] = this._calculateScoringAverage(this.state.roundArray[i].date, this.state.roundArray[i].round,parVal)
        //console.log(this._calculateScoringAverage(this.state.roundArray[i].date, this.state.roundArray[i].round,parVal))
      }
      return avgArray
    }

    _calculateUpDownArray(timeFrameValue){
      var avgArray = []
      for(var i = 0; i < timeFrameValue; i++){
        avgArray[i] = this._calculateUpAndDown(this.state.roundArray[i].date, this.state.roundArray[i].round)
      }
      return avgArray
    }

    _calculatePuttingAverageArrayReal(timeFrameValue){
      var avgArray = []
      for(var i = 0; i < timeFrameValue; i++){
        avgArray[i] = this._calculatePutsPerRoundAvg(this.state.roundArray[i].date, this.state.roundArray[i].round)
        console.log(this._calculatePutsPerRoundAvg(this.state.roundArray[i].date, this.state.roundArray[i].round))
      }
      return avgArray
    }

    _calculatePuttingAverageArray(timeFrameValue){
      var avgArray = []
      for(var i = 0; i < timeFrameValue; i++){
        avgArray[i] = this._calculatePutsPerRound(this.state.roundArray[i].date, this.state.roundArray[i].round)
        console.log(this._calculatePutsPerRound(this.state.roundArray[i].date, this.state.roundArray[i].round))
      }
      return avgArray
    }




  render() {
    console.log(this.state.roundArray)
    //console.log(this._calculatePuttingAverageArray())
    var arrayPuttingAvg = this._calculatePuttingAverageArray(this._getTimeFrame())
    var arrayPuttingAvgReal = this._calculatePuttingAverageArrayReal(this._getTimeFrame())
    var arrayParAverageArray3 = this._calculateParAverageArray(this._getTimeFrame(), 3)
    var arrayParAverageArray4 = this._calculateParAverageArray(this._getTimeFrame(), 4)
    var arrayParAverageArray5 = this._calculateParAverageArray(this._getTimeFrame(), 5)
    var upDownArray = this._calculateUpDownArray(this._getTimeFrame())
    // var totalHoles = this._getTotalHoles()
    // //Scoring Average
    // var valueSCM = this._calculateScoringMarkers()
    // var scoringAvg3 = this._calculateScoringAverage(3)
    // var scoringAvg4 = this._calculateScoringAverage(4)
    // var scoringAvg5 = this._calculateScoringAverage(5)
    // //Accuracy
    // var valueGIR = this._calculateGIRPercentage()
    // var getGIR = this._getGIRAmount()
    // var avgHoleProx = this._calculateAvgHoleProx()
    // var tendancyLeft = this._calculateTendancy("Left")
    // var tendancyOn = this._calculateTendancy("On")
    // var tendancyRight = this._calculateTendancy("Right")
    // //Putting
    // var totalPutsPerRound = this._calculatePutsPerRound()
    // var totalPutsPerRoundAvg = totalPutsPerRound/realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0').length
    // var zeroPuts = this._calculateNumberOf123Puts(0)
    // var onePuts = this._calculateNumberOf123Puts(1)
    // var twoPuts = this._calculateNumberOf123Puts(2)
    // var threePuts = this._calculateNumberOf123Puts(3)
    // var overPuts = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0').length - (zeroPuts+onePuts+twoPuts+threePuts)
    // //Up and Down
    // var upAndDown = this._calculateUpAndDown()
    // console.log(scoringAvg3)

    const configPut = {
      dataSets: [{
        values: arrayPuttingAvg,
        drawValues: false,
        valueTextFontSize:16,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: false,
        drawHorizontalHighlightIndicator:true,
        drawVerticalHighlightIndicator:true,
        circleRadius:6,
        drawFilled:true,
        fillAlpha: 0.5,
        fillColor: '#1a9274',
        lineWidth: 0,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:true,
        customAxisMax: this._getHighest(arrayPuttingAvg) + 1,
        customAxisMin: this._getLowest(arrayPuttingAvg) - 1,
        labelCount: this._getLowestHighest(arrayPuttingAvg),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };

    const configPutReal = {
      dataSets: [{
        values: arrayPuttingAvgReal,
        drawValues: this._getTimeFrameForCircles(),
        valueTextFontSize:12,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: this._getTimeFrameForCircles(),
        lineWidth: 2,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:false,
        customAxisMax: this._getHighest(arrayPuttingAvgReal) + 1,
        customAxisMin: this._getLowest(arrayPuttingAvgReal) - 1,
        labelCount: this._getLowestHighest(arrayPuttingAvgReal),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };

    const configPar3 = {
      dataSets: [{
        values: arrayParAverageArray3,
        drawValues: this._getTimeFrameForCircles(),
        valueTextFontSize:12,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: this._getTimeFrameForCircles(),
        lineWidth: 2,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:false,
        customAxisMax: this._getHighest(arrayParAverageArray3) + 1,
        customAxisMin: this._getLowest(arrayParAverageArray3) - 1,
        labelCount: this._getLowestHighest(arrayParAverageArray3),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };

    const configPar4 = {
      dataSets: [{
        values: arrayParAverageArray4,
        drawValues: this._getTimeFrameForCircles(),
        valueTextFontSize:12,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: this._getTimeFrameForCircles(),
        lineWidth: 2,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:false,
        customAxisMax: this._getHighest(arrayParAverageArray4) + 1,
        customAxisMin: this._getLowest(arrayParAverageArray4) - 1,
        labelCount: this._getLowestHighest(arrayParAverageArray4),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };

    const configPar5 = {
      dataSets: [{
        values: arrayParAverageArray5,
        drawValues: this._getTimeFrameForCircles(),
        valueTextFontSize:12,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: this._getTimeFrameForCircles(),
        lineWidth: 2,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:false,
        customAxisMax: this._getHighest(arrayParAverageArray5) + 1,
        customAxisMin: this._getLowest(arrayParAverageArray5) - 1,
        labelCount: this._getLowestHighest(arrayParAverageArray5),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };

    const configUpDown = {
      dataSets: [{
        values: upDownArray,
        drawValues: this._getTimeFrameForCircles(),
        valueTextFontSize:12,
        colors: ['red'],
        //label: 'Puts puts puts puts puts puts puts puts puts puts',
        drawCubic: true,
        drawCircles: this._getTimeFrameForCircles(),
        lineWidth: 2,
      }],
      autoScaleMinMax: true,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      labels: this._getDatesFromRoundArray(),
      minOffset: 20,
      scaleYEnabled: true,
      scaleXEnabled: true,
      showLegend:false,
      drawMarkers:true,
      // animation:({
      //   xAxisDuration: 1,
      //   yAxisDuration: 1,
      //   easingOption: 'linear'
      // }),
      xAxis: {
        axisLineWidth: 1,
        drawLabels: false,
        position: 'bottom',
        drawGridLines: false,
        labelCount: this._getTimeFrame()
      },
      leftAxis: {
        enabled:true,
        drawAxisLine: false,
        drawLabels:false,
        customAxisMax: this._getHighest(upDownArray) + 1,
        customAxisMin: this._getLowest(upDownArray) - 1,
        labelCount: this._getLowestHighest(upDownArray),
        startAtZero: false,
        drawGridLines:true,
        position: 'outside',
        //startAtZero: true,
        axisMinimum: 0,
        //axisMaximum: 50
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      valueFormatter: {
        minimumSignificantDigits: 1,
        type: 'regular',
        numberStyle: 'NoStyle',
        maximumDecimalPlaces: 1
      }
    };


    return (
      <View style={styles.container1}>
        <View style={{margin:5}}>
          <ToggleContainer
            value={(this.state && this.state.timeFrame) || '5 Rounds'}
            options={['5 Rounds', '10 Rounds', 'All Rounds']}
            style={{padding: 1}}
            orientation={"horizontal"}
            spacing={10}
            renderItem={(option, active) => (
              <ToggleItem
                option={option}
                active={active}
                onPress={(timeFrame) => this.setState({timeFrame})}
                color={"rgb(74,144,226)"}
                backgroundColor={"rgb(255,255,255)"}
                borderColor={"rgba(231,231,231,1)"}
                activeColor={"rgba(255,255,255,1)"}
                activeBackgroundColor={"rgb(74,144,226)"}
                borderRadius={7}
              />
            )}
          />
          </View>
        <ScrollView style={styles.container2}>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Total Putts Per Round</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configPut} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(arrayPuttingAvg)} AVG</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Average Putts Per Round</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configPutReal} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(arrayPuttingAvgReal)} AVG</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Average Score on Par 3</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configPar3} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(arrayParAverageArray3)} AVG</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Average Score on Par 4</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configPar4} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(arrayParAverageArray4)} AVG</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Average Score on Par 5</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configPar5} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(arrayParAverageArray5)} AVG</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Up & Down per Round</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', margin:10}}>
            <View style={{alignSelf: 'center'}}>
              <LineChart config={configUpDown} style={styles.chartSCM}/>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
            <Text>{this._getArrAvg(upDownArray)} AVG</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  chart: {
    width:300,
    height: 300,
    backgroundColor: 'transparent',
    marginTop:20,
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'stretch',

  },
  chartSCM: {
    width:300,
    height: 300,
    backgroundColor: 'transparent',
    //marginTop:20,
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'stretch',

  },
  container1: {
    marginTop:65,
    flexDirection: 'column',
    flex: 1,
    marginBottom:60
    //backgroundColor: '#fff'
  },
  container2: {
    marginTop:0,
    flexDirection: 'column',
    flex: 1,
    //backgroundColor: '#fff'
  },
  containerSection: {
    flexDirection: 'column',
    flex: 1,
    borderColor: '#1a9274',
    //borderWidth: 3,
    // padding: 10,
    marginTop:20
    //backgroundColor: '#fff'
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC",
    margin: 15
  }
})
