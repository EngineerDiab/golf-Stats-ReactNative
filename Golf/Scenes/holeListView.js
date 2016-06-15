
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { ListView } from 'realm/react-native';
var Button = require('react-native-button');
import realm from './realm';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'



export default class holeListView extends Component {

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

  constructor (props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    //round: realm.objects('Round').slice('0')[0].roundNumber.toString(),
    holeItems: realm.objects('Hole').filtered(`date == "${this._getDate()}" AND round == "${realm.objects('Round').slice('0')[0].roundNumber.toString()}"`).sorted('holeID').slice('0'),
    dataSource: ds.cloneWithRows({})
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.holeItems),
    });

    realm.addListener('change', () => {
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(realm.objects('Hole').filtered(`date == "${this._getDate()}" AND round == "${realm.objects('Round').slice('0')[0].roundNumber.toString()}"`).sorted('holeID').slice('0'))
      });
    });

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
            <Text>{rowData.id}</Text>
          </View>
          <View style={styles.seperator}></View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return(
      <View style={styles.listView}>
        <Button
        style={{fontSize: 20, color: 'green', marginTop: 64}}
        styleDisabled={{color: 'red'}}
        onPress={() => Actions.stats()}
        >
        New Hole
        </Button>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.list}
      />
      </View>


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
  },
  list:{
    padding:20
  }
})
