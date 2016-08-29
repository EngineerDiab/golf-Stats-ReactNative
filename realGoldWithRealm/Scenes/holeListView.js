
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

export default class holeListView extends Component {
  constructor (props) {
  super(props);
  var holeInfo = [
    {"hole": "1" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "2" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "3" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "4" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "5" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "6" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "7" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "8" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "9" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "10" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "11" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "12" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "13" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "14" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "15" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "16" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "17" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"},
    {"hole": "18" ,"fullStroke" : "TBD" , "halfStroke" : "TBD", "puts" : "TBD", "firstPut" : "TBD", "penalties" : "TBD", "fairway": "TBD"}
    ]
  var holeArray = this._getHoleNumber(holeInfo)
  //var fullStrokeArray = this._getFullStroke(holesInitial)
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows(holeArray)
    //dataSource: ds.cloneWithRows(['1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'])
    };
  }

  _getHoleNumber(holes){
    var holeNumber = [];
    for(var i = 0; i < holes.length ; i++){
      holeNumber.push(holes[i].hole)
    }

    return holeNumber

  }

  _getFullStroke(holes){
    var fullStroke = [];
    for(var i = 0; i < holes.length ; i++){
      fullStroke.push(holes[i].fullStroke)
    }
    return fullStroke

  }


  renderRow(rowData, sectionID, rowID){
    var parsedRowID = parseInt(rowID, 10)
    var realRowID = parsedRowID + 1
    return(
      <TouchableHighlight
        onPress={() => Actions.stats({holeNumber: realRowID})}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <View>
          <View style={styles.row}>
            <Text>{rowData}</Text>

          </View>
          <View style={styles.seperator}></View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return(
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      style={styles.listView}
    />

  )
  }
}

var styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    padding: 12,
    height:44
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC"
  },
  listView: {
    marginTop:64,
    marginBottom:49,
    padding: 20
  }
})
