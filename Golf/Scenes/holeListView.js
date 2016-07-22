
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { ListView } from 'realm/react-native';
//var Button = require('react-native-button');
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import realm from './realm';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  PixelRatio
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

    _getDeviceForHeight(){
      if(DeviceInfo.getModel()=== "iPhone 6 plus"){
        return 520
      }
      if(DeviceInfo.getModel()=== "iPhone 6"){
        return 450
      }
      else{
        return 350
      }
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
    //console.log(DeviceInfo.getModel())
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
    return(
        <TouchableHighlight
          onPress={() => Actions.stats({holeNumber: realRowID, holeNumberString: realRowIDString, round: this.state.round})}
          activeOpacity={75 / 100}
          underlayColor={"rgb(210,210,210)"}>
          <View style={{padding:0}}>
          <View style={{flexDirection:'column'}}>
            <View style={styles.row}>
              <View style={{flex:1}}>
                <Text style={{alignSelf:'center', fontSize:15}}>{rowData.holeID}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:15, alignSelf:'center'}}>{rowData.par}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:15, alignSelf:'center'}}>{rowData.fullStroke + rowData.halfStroke + rowData.puts}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{color: (rowData.fullStroke + rowData.halfStroke + rowData.puts) - rowData.par <= -1 ? '#ea5b1c' :'black', fontSize:15, alignSelf:'center'}}>{(rowData.fullStroke + rowData.halfStroke + rowData.puts)- rowData.par}</Text>
              </View>
            </View>
            <View style={styles.seperator}></View>
          </View>
          </View>
        </TouchableHighlight>
    )
  }

  render(){
    newRound = (props) => {
        let holesObjects = realm.objects('Hole').filtered(`date == "${this._getDate()}"`).sorted('round', true).slice('0')[0].round
        var holesObjectsInt = parseInt(holesObjects, 10)

        console.log(holesObjectsInt)
        if(holesObjects === null || undefined){
           realm.write(() => {
             let round = realm.create('Round', {
               id: 1,
               roundNumber: 1,
             }, true);
           })
        }
        else{
          realm.write(() => {
            let round = realm.create('Round', {
              id: 1,
              roundNumber: holesObjectsInt + 1,
            }, true);
          })
        }
      }
    return(
      <View style={{flex: 1, marginTop:20}}>
      <View style={styles.listView}>
        <View style={styles.rowIndependant}>
          <View>
            <Icon name="ios-flag" size={42} color="#1a9274"></Icon>
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
            <Text style={{color: (this._getTotalScore()) - this._getTotalPar() <= -1 ? '#ea5b1c' :'black', fontSize:30}}>{this._getTotalScore() - this._getTotalPar()}</Text>
          </View>
          <View>
            <Icon name="ios-flag" size={42} color="#1a9274"></Icon>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-between', backgroundColor: 'transparent'}}>
          <View style={{flex:1}}>
            <Button
            style={{backgroundColor: '#ea5b1c', borderColor: 'white'}}
            textStyle={{color: 'white'}}
            onPress={() => newRound()}
            >
            <Icon name="ios-create-outline" size={30} color="white"></Icon>
            </Button>
          </View>
          <View style={{flex: 3}}>
            <Button
            style={{backgroundColor: '#1a9274', borderColor: 'white'}}
            textStyle={{color: 'white'}}
            onPress={() => Actions.stats()}
            >
            New Hole
            </Button>
          </View>
        </View>
        <View style={styles.rowIndependantHeader}>
          <View style={{flex:1}}>
            <Text style={{fontSize: 15, alignSelf:'center'}}>HOLE</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View style={{flex:1}}>
            <Text style={{fontSize: 15, alignSelf:'center'}}>PAR</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View style={{flex:1}}>
            <Text style={{fontSize: 15, alignSelf:'center'}}>SCORE</Text>
          </View>
          <View style={styles.seperatorColumn}></View>
          <View style={{flex:1}}>
            <Text style={{fontSize: 15, alignSelf:'center'}}>+/-</Text>
          </View>
        </View>
        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        style={{height: this._getDeviceForHeight()}}
      />
      </View>
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
    margin:10,
    alignItems:'center'
  },
  rowIndependant:{
    flexDirection:'row',
    justifyContent:'space-around',
    //backgroundColor: 'pink',
    alignItems: 'center',
    padding: 0,
    height:44
    //backgroundColor: 'red'
  },
  rowIndependantHeader:{
    flexDirection:'row',
    justifyContent:'space-around',
    padding: 0,
    height:20,
    //backgroundColor: 'red'
  },
  roundContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderColor: '#1a9274',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width:50
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
    //marginTop:49,
    marginBottom:49,
    padding: 20,
  },
  list:{
    //flex:1,
    //marginBottom:100,
    //alignSelf:'stretch'
  },
  textStyle:{
    fontSize: 15,
    // fontWeight: 'bold'
  }
})
