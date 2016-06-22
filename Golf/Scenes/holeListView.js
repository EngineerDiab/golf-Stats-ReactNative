
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { ListView } from 'realm/react-native';
//var Button = require('react-native-button');
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import realm from './realm';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView
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

    _getTotalScore(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${this._getDate()}" AND round == "${realm.objects('Round').slice('0')[0].roundNumber.toString()}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].fullStroke + arrayOfCurrentHoles[i].halfStroke + arrayOfCurrentHoles[i].puts
      }
      return total
    }

    _getTotalPar(){
      var arrayOfCurrentHoles = realm.objects('Hole').filtered(`date == "${this._getDate()}" AND round == "${realm.objects('Round').slice('0')[0].roundNumber.toString()}"`).sorted('holeID').slice('0')
      var total = 0;
      for(var i = 0; i < arrayOfCurrentHoles.length; i++){
        total = total + arrayOfCurrentHoles[i].par
      }
      return total
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
    // var offset = rowData.par - (rowData.fullStroke + rowData.halfStroke + rowData.puts)
    // var styleValueOffset = "color: 'black'"
    // if(offset <= -1){
    //   styleValueOffset = "color: 'red'"
    // }
    // else{
    //   styleValueOffset = "color: 'black'"
    // }
    //console.log(styleValueOffset)
    return(
      <TouchableHighlight
        onPress={() => Actions.stats({holeNumber: realRowID, holeNumberString: realRowIDString, round: this.state.round})}
        activeOpacity={75 / 100}
        underlayColor={"rgb(210,210,210)"}>
        <View style={{padding:0}}>
        <View style={{flexDirection:'column'}}>
          <View style={styles.row}>
            <View>
              <Text style={{alignSelf:'center', fontSize:15}}>{rowData.holeID}</Text>
            </View>
            <View>
              <Text style={{fontSize:15}}>{rowData.fullStroke + rowData.halfStroke + rowData.puts}</Text>
            </View>
            <View>
              <Text style={{fontSize:15}}>{rowData.par}</Text>
            </View>
            <View>
              <Text style={{color: (rowData.fullStroke + rowData.halfStroke + rowData.puts) - rowData.par <= -1 ? 'red' :'black', fontSize:15}}>{(rowData.fullStroke + rowData.halfStroke + rowData.puts)- rowData.par}</Text>
            </View>
          </View>
          <View style={styles.seperator}></View>
        </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return(
      <View style={styles.listView}>
        <View style={styles.rowIndependant}>
          <View>
            <Icon name="dot-circle-o" size={33} color="#1a9274"></Icon>
          </View>
          <View style={{flexDirection: 'column', justifyContent:'space-between'}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View>
                <Text style={styles.textStyle}>ROUND     </Text>
              </View>
              <View>
                <Text style={styles.textStyle}>     {realm.objects('Round').slice('0')[0].roundNumber.toString()}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <View>
                <Text style={styles.textStyle}>TOTAL     </Text>
              </View>
              <View>
                <Text style={styles.textStyle}>     {this._getTotalScore()}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={{color: (this._getTotalScore()) - this._getTotalPar() <= -1 ? 'red' :'black', fontSize:30}}>{this._getTotalScore() - this._getTotalPar()}</Text>
          </View>
          <View>
            <Icon name="dot-circle-o" size={33} color="#1a9274"></Icon>
          </View>
        </View>
        <View>
          <Button
          style={{backgroundColor: '#058CFA', borderColor: 'white'}}
          textStyle={{color: 'white'}}
          onPress={() => Actions.stats()}
          >
          New Hole
          </Button>
        </View>
        <View style={styles.rowIndependantHeader}>
          <View>
            <Text style={{fontSize: 15}}>HOLE</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View>
            <Text style={{fontSize: 15}}>PAR</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View>
            <Text style={{fontSize: 15}}>SCORE</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View>
            <Text style={{fontSize: 15}}>+/-</Text>
          </View>
        </View>
        <ScrollView style={{marginBottom:49}}>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={styles.list}
      />
      </ScrollView>
      </View>


  )
  }
}

var styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding: 0,
    height:20,
    flexWrap: 'wrap',
    margin:10
  },
  rowIndependant:{
    flexDirection:'row',
    justifyContent:'space-around',
    //backgroundColor: 'pink',
    alignItems: 'center',
    padding: 0,
    height:44,
    //backgroundColor: 'red'
  },
  rowIndependantHeader:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding: 0,
    height:20,
    //backgroundColor: 'red'
  },
  seperator:{
    height:1,
    backgroundColor: "#CCCCCC",
  },
  seperatorColumn:{
    width:1,
    backgroundColor: "#CCCCCC",
  },
  listView: {
    flexDirection:'column',
    marginTop:49,
    marginBottom:49,
    padding: 20
  },
  list:{
    padding:0
  },
  textStyle:{
    fontSize: 15,
    // fontWeight: 'bold'
  }
})
