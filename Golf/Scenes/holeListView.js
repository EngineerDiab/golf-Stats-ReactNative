
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { ListView } from 'realm/react-native';
import realm from './realm';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'



export default class holeListView extends Component {
  constructor (props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    round: '1',
    dataSource: ds.cloneWithRows(['1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'])
    };
  }

  renderRow(rowData, sectionID, rowID){
    var parsedRowID = parseInt(rowID, 10)
    var realRowID = parsedRowID + 1
    var realRowIDString = realRowID.toString()
    //console.log(realRowID + 1)
    return(
      <TouchableHighlight
        onPress={() => Actions.stats({holeNumber: realRowID, holeNumberString: realRowIDString, round: this.state.round})}
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
