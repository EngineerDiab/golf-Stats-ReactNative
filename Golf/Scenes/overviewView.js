import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
import Button from 'apsl-react-native-button';
import Avatar from 'react-native-interactive-avatar';
import Badge from 'react-native-smart-badge';
import Swipeout from 'react-native-swipeout';
//var Button = require('react-native-button');
var _ = require('lodash');
import realm from './realm';

import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  AlertIOS
} from 'react-native'

export default class overviewView extends Component {

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
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    //round: realm.objects('Round').slice('0')[0].roundNumber.toString(),
    roundItems: _.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1).reverse(),
    dataSource: ds.cloneWithRows({})
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.roundItems),
    });

    realm.addListener('change', () => {
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(_.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1).reverse())
      });
    });

  }
  renderRow(rowData, sectionID, rowID){

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {AlertIOS.alert(
            'Delete?',
            "Once a round is deleted it cannot be recovered and it will not count towards your stats. Are you sure you want to delete this round?",
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!'), style:'cancel'},
              {text: 'Delete', onPress: () => {_deleteRound()}, style:'destructive'},
            ]
          )}
    }];

    var _deleteRound = function(){
      var roundsArra = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).slice('0')
      realm.write(() => {

        // for(var i = 0; i < roundsArra.length;i++){
        //   realm.delete(roundsArra[i])
        // }
        realm.delete(roundsArra);

      });
    }

    var _getTotalScore = function(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].fullStroke + arrayOfCurrentHoles[i].halfStroke + arrayOfCurrentHoles[i].puts + arrayOfCurrentHoles[i].penalties
      }
      return total
    }

    var _getTotalPar = function(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].par
      }
      return total
    }

    var _getTotalPutts = function(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].puts
      }
      return total
    }

    var _calculateGIRPercentage = function(){
      var GIRArray = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).slice('0')
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

    var _calculateTendancy = function(location){
      return(realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}" AND fairway == "${location}"`).slice('0').length)
    }

    return(
      <Swipeout right={swipeBtns} autoClose={true} style={{height:30}}>
      <TouchableHighlight
        onPress={() => Actions.statsForOverview({ date: rowData.date, round: rowData.round})}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <View style={{
         flexDirection: 'column',
         justifyContent: 'center',
         //alignItems: 'center',
         alignSelf:'stretch',
         //margin:10,
         borderRadius:.5,
         backgroundColor: 'white',
         shadowColor: "black",
         shadowOpacity: .5,
         shadowRadius: 3,
         shadowOffset: {
           height: 0,
           width: 0
         },
         marginTop:5,
         backgroundColor: (_getTotalScore()) - _getTotalPar() <= 0 ? '#e2b6b3' :'white'
       }}>
          <View style={styles.row}>
            <View style={{flexDirection:'row'}}>
              <View style={{alignSelf: 'flex-start', borderRadius:2, borderColor:'black', borderBottomWidth:1}}>
                <Text style={{alignSelf:'center'}}>{rowData.date}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View style={{justifyContent:'center'}}>
                  <Badge textStyle={{color: 'white',}} style={{backgroundColor: '#ee5a52', marginTop: 10,}}>
                      Score
                  </Badge>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text textStyle={{color: 'white',}} style={{marginTop: 10,}}>
                      {_getTotalScore()}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View style={{justifyContent:'center'}}>
                  <Badge textStyle={{color: 'white',}} style={{backgroundColor: '#ee5a52',marginTop: 10,}}>
                      +/-
                  </Badge>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text textStyle={{color: 'white',}} style={{marginTop: 10,}}>
                      {_getTotalScore() - _getTotalPar()}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View style={{justifyContent:'center'}}>
                  <Badge textStyle={{color: 'white',}} style={{marginTop: 10, backgroundColor: '#ee5a52'}}>
                      Fairway
                  </Badge>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text textStyle={{color: 'white',}} style={{marginTop: 10,}}>
                      {Math.round(_calculateTendancy("On")/(_calculateTendancy("Left") + _calculateTendancy("On") + _calculateTendancy("Right")) * 100)}%
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View style={{justifyContent:'center'}}>
                  <Badge textStyle={{color: 'white',}} style={{marginTop: 10,backgroundColor: '#ee5a52'}}>
                      GIR
                  </Badge>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text textStyle={{color: 'white',}} style={{marginTop: 10,}}>
                      {Math.round(_calculateGIRPercentage())}%
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'column', alignItems:'center'}}>
                <View style={{justifyContent:'center'}}>
                  <Badge textStyle={{color: 'white',}} style={{marginTop: 10, backgroundColor: '#ee5a52'}}>
                      Putts
                  </Badge>
                </View>
                <View style={{justifyContent:'center'}}>
                  <Text textStyle={{color: 'white',}} style={{marginTop: 10,}}>
                      {_getTotalPutts()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </View>
      </TouchableHighlight>
      </Swipeout>
    )
  }

  render(){
    return(
      <ScrollView>
      <View style={styles.listView}>
        {/*<Button
        style={{fontSize: 20, color: 'green', marginTop: 64}}
        styleDisabled={{color: 'red'}}
        onPress={() => Actions.stats()}
        >
        New Hole
        </Button>*/}
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.list}
        //bounces = {false}
      />
      </View>
      </ScrollView>


  )
  }
}

var styles = StyleSheet.create({
  row:{
    flexDirection:'column',
    justifyContent:'space-between',
    padding: 12,
    height:100
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC"
  },
  listView: {
    marginTop:60,
    marginBottom:49,
  //padding: 20
  },
  list:{
    //padding:20
  },
  card: {
   flexDirection: 'column',
   justifyContent: 'center',
   //alignItems: 'center',
   alignSelf:'stretch',
   //margin:10,
   //marginTop:5,
   borderRadius:.5,
   backgroundColor: 'white',
   shadowColor: "black",
   shadowOpacity: .5,
   shadowRadius: 3,
   shadowOffset: {
     height: 0,
     width: 0
   },
 },
 circle: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: '#ea5b1c',
    alignItems:'center'
  }
})
