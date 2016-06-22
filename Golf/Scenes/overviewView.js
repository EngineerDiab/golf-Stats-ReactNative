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
    roundItems: _.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1),
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
        dataSource:this.state.dataSource.cloneWithRows(_.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1))
      });
    });

  }
  renderRow(rowData, sectionID, rowID){
    //console.log(_.slice(_.uniqWith(realm.objects('Hole').map(this._getUniqueRounds, this), _.isEqual), 1));
    // var parsedRowID = parseInt(rowID, 10)
    // var realRowID = parsedRowID + 1
    // var realRowIDString = realRowID.toString()
    //console.log(realRowID + 1)
    return(
      <TouchableHighlight
        //onPress={() => Actions.stats({holeNumber: realRowID, holeNumberString: realRowIDString, round: this.state.round})}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text>Date: {rowData.date}</Text>
            </View>
            <View style={styles.right}>
              <Text>Round: {rowData.round}</Text>
            </View>
            <View style={styles.left}>
              <Text>Holes Played: {realm.objects('Hole').filtered(`date == "${rowData.date}" AND round == "${rowData.round}"`).length}</Text>
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
    justifyContent:'space-around',
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
