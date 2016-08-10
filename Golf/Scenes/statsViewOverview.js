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

  _getTotalHoles(){
    return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}"`).slice('0').length)
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

    _calculateScoringAverage(parValue){
      var getArray = realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND par== ${parValue}`).slice('0')
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
      return (Math.round((total/getArray.length)*100)/100)
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

    _calculateTendancy(location){
      return(realm.objects('Hole').filtered(`date == "${this.props.date}" AND round == "${this.props.round}" AND fairway == "${location}"`).slice('0').length)
    }



  render() {
    var totalHoles = this._getTotalHoles()
    //Scoring Average
    var valueSCM = this._calculateScoringMarkers()
    var scoringAvg3 = this._calculateScoringAverage(3)
    var scoringAvg4 = this._calculateScoringAverage(4)
    var scoringAvg5 = this._calculateScoringAverage(5)
    //Accuracy
    var valueGIR = this._calculateGIRPercentage()
    var getGIR = this._getGIRAmount()
    var avgHoleProx = this._calculateAvgHoleProx()
    var tendancyLeft = this._calculateTendancy("Left")
    var tendancyOn = this._calculateTendancy("On")
    var tendancyRight = this._calculateTendancy("Right")
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
    console.log(scoringAvg3)

    const configGIR = {
      dataSets: [{
        values: [valueGIR,100-valueGIR],
        colors: ['#F27852', '#1a9274'],
        drawValues:false
        //label: 'Green In Regulation'
      }],
      rotationEnabled: false,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      pinchZoomEnabled: false,
      doubleTapToZoomEnabled: false,
      drawHoleEnabled:true,
      animation:({
        xAxisDuration: 3,
        yAxisDuration: 3,
        easingOption: 'easeInOutCubic'
      }),
      //labels: ['GIR', 'Not GIR'],
      //drawHoleEnabled: true,
      centerText: `${Math.round(valueGIR)}%`,
      // drawSliceTextEnabled: false,
      //usePercentValuesEnabled: true,
      maxAngle: 360,
    };
    const configFairway = {
      dataSets: [{
        values: [tendancyOn,tendancyLeft+tendancyRight],
        colors: ['#F27852', '#1a9274'],
        drawValues:false
        //label: 'Green In Regulation'
      }],
      rotationEnabled: false,
      userInteractionEnabled: false,
      backgroundColor: 'transparent',
      pinchZoomEnabled: false,
      doubleTapToZoomEnabled: false,
      drawHoleEnabled:true,
      animation:({
        xAxisDuration: 3,
        yAxisDuration: 3,
        easingOption: 'easeInOutCubic'
      }),
      //labels: ['GIR', 'Not GIR'],
      //drawHoleEnabled: true,
      centerText: `${Math.round(tendancyOn/(tendancyOn+tendancyLeft+tendancyRight)*100)}%`,
      // drawSliceTextEnabled: false,
      //usePercentValuesEnabled: true,
      maxAngle: 360,
    };
    const configSCM = {
      dataSets: [{
        values: valueSCM.reverse(),
        colors:['#F27852'],
        valueTextFontSize: 12,
      }],
      userInteractionEnabled:false,
      backgroundColor: 'transparent',
      pinchZoomEnabled: false,
      doubleTapToZoomEnabled: false,
      labels: ['Quad+', 'Triple Bogie', 'Double Bogie', 'Bogie', 'Par', 'Birdie', 'Eagle'],
      showLegend: false,
      minOffset: 20,
      xAxis: {
        axisLineWidth: 0,
        position: 'bottom',
        drawGridLines:false
      },
      leftAxis: {
        spaceTop: 0.18,
        drawGridLines:false,
        drawLabels:false,
        axisLineWidth:0
      },
      rightAxis: {
        enabled: false,
        drawGridLines: false
      },
      animation:({
        xAxisDuration: 0,
        yAxisDuration: 4,
        easingOption: 'easeInOutCubic'
      }),
    };

    return (
      <ScrollView style={styles.container1}>
        <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:20}}>
          <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
            <Text style={{color: 'black', fontSize: 20}}>    Scoring Average</Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-around', margin:10}}>
          <View style={{alignSelf: 'center'}}>
            <HorizontalBarChart config={configSCM} style={styles.chartSCM}/>
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <View>
              <Text>Par 3</Text>
            </View>
            <View>
              <Text>{scoringAvg3}</Text>
            </View>
          </View>
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <View>
              <Text>Par 4</Text>
            </View>
            <View>
              <Text>{scoringAvg4}</Text>
            </View>
          </View>
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <View>
              <Text>Par 5</Text>
            </View>
            <View>
              <Text>{scoringAvg5}</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerSection}>
          <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
            <Text style={{color: 'black', fontSize: 20}}>    Accuracy</Text>
          </View>
          <View style={{margin:20, alignItems:'center'}}>
            <Text>Greens In Regulation</Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <View style={{alignSelf: 'center'}}>
              <PieChart config={configGIR} style={styles.chart}/>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <View>
              <Text>{totalHoles} Holes</Text>
            </View>
            <View>
              <Text>{getGIR} GIR</Text>
            </View>
            <View>
              <Text>{totalHoles - getGIR} Not-GIR</Text>
            </View>
          </View>
          <View style={styles.seperator}></View>
          <View style={{margin:20, alignItems:'center'}}>
            <Text>Fairway Tendency</Text>
          </View>
          <View style={{justifyContent: 'space-around'}}>
            <View style={{alignSelf: 'center'}}>
              <PieChart config={configFairway} style={styles.chart}/>
            </View>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <View>
              <Text>{tendancyLeft} Left</Text>
            </View>
            <View>
              <Text>{tendancyOn} On</Text>
            </View>
            <View>
              <Text>{tendancyRight} Right</Text>
            </View>
          </View>
          <View style={styles.seperator}></View>
          <View style={{alignItems:'center', flexDirection:'column'}}>
            <View style={{margin:20}}>
              <Text>Average Hole Proximity</Text>
            </View>
            <View>
              <Text>{avgHoleProx} feet</Text>
            </View>
          </View>
          <View style={styles.containerSection}>
            <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
              <Text style={{color: 'black', fontSize: 20}}>    Putting</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:20}}>
                  <Text>Total Putts</Text>
                </View>
                <View>
                  <Text>{totalPutsPerRound}</Text>
                </View>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:20}}>
                  <Text>Putting Average</Text>
                </View>
                <View>
                  <Text>{Math.round(totalPutsPerRoundAvg*100)/100}</Text>
                </View>
              </View>
            </View>
            <View style={styles.seperator}></View>
            <View style={{alignSelf:'center', margin:20}}>
              <Text>Number of 0,1,2,3,4+ putts</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:5}}>
                  <Text>0</Text>
                </View>
                <View>
                  <Text>{zeroPuts}</Text>
                </View>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:5}}>
                  <Text>1</Text>
                </View>
                <View>
                  <Text>{onePuts}</Text>
                </View>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:5}}>
                  <Text>2</Text>
                </View>
                <View>
                  <Text>{twoPuts}</Text>
                </View>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:5}}>
                  <Text>3</Text>
                </View>
                <View>
                  <Text>{threePuts}</Text>
                </View>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:5}}>
                  <Text>4+</Text>
                </View>
                <View>
                  <Text>{overPuts}</Text>
                </View>
              </View>
            </View>
            <View style={styles.containerSection}>
              <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
                <Text style={{color: 'black', fontSize: 20}}>    Up & Down</Text>
              </View>
              <View style={{alignItems:'center', flexDirection:'column'}}>
                <View style={{margin:20}}>
                  <Text>Total Up & Down</Text>
                </View>
                <View>
                  <Text>{upAndDown}</Text>
                </View>
              </View>
            </View>
            <View style={{height:50}}></View>
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
