import { ToggleContainer, ToggleItem } from 'deco-ride-share-demo'
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
var Slider = require('react-native-slider');
import Button from 'apsl-react-native-button';
//var Button = require('react-native-button');
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
    var _getTotalScore = function(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].fullStroke + arrayOfCurrentHoles[i].halfStroke + arrayOfCurrentHoles[i].puts
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
    return(
      <TouchableHighlight
        onPress={() => Actions.statsForOverview({ date: rowData.date, round: rowData.round})}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <View>
          <View style={styles.row}>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
              <View style={styles.left}>
                <Text style={{alignSelf:'center'}}>{rowData.date}</Text>
              </View>
              <View style={styles.right}>
                <Text style={{alignSelf:'center'}}>Round {rowData.round}</Text>
              </View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
              <View style={styles.left}>
                <Text style={{alignSelf:'center'}}>{_getTotalScore()}</Text>
              </View>
              <View style={styles.right}>
                <Text style={{color: (_getTotalScore()) - _getTotalPar() <= -1 ? '#ea5b1c' :'black', fontSize:14, alignSelf:'center'}}>{_getTotalScore() - _getTotalPar()}</Text>
              </View>
            </View>
            <View style={{flexDirection:'column', justifyContent:'center'}}>
              <View>
                <Text style={{alignSelf:'center'}}>Holes Played: {realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).length}</Text>
              </View>
              <View>
                <Text style={{alignSelf:'center', color: _calculateGIRPercentage() <= 50 ? 'black' :'#ea5b1c'}}>GIR {Math.round(_calculateGIRPercentage())}%</Text>
              </View>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </View>
      </TouchableHighlight>
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
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 12,
    height:44
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC"
  },
  listView: {
    marginTop:49,
    marginBottom:49,
    padding: 20
  },
  list:{
    padding:20
  },
  left:{

  },
  right:{

  }
})
