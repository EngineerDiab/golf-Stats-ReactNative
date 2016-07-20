/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {AppRegistry, Text, View} from 'react-native';
 import {Scene, Router, Actions} from 'react-native-router-flux';
 import TabIcon from './Scenes/TabIcon';
 //import Icon from 'react-native-vector-icons/Ionicons';
 import visualize from './Scenes/visualize';
 import holeListView from './Scenes/holeListView';
 import statsView from './Scenes/statsView';
 import overviewView from './Scenes/overviewView';
 import realm from './Scenes/realm';
 import statsViewOverview from './Scenes/statsViewOverview';


//  class TabIcon extends React.Component {
//     render(){
//         return (
//             <View>
//             <Icon name={this.props.iconString} size={35} color={this.props.selected ?  'red' : 'black'} />
//             <Text>{this.props.title}</Text>
//             </View>
//         );
//     }
// }

 class Golf extends React.Component {

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

   render() {
     realm.write(() => {
       let hole = realm.create('Hole', {
         id: '0',
         date: '16/03/94',
         par: 0,
         round: '1',
         holeID:  0,
         fullStroke: 0,
         halfStroke: 0,
         puts: 0,
         firstPutDistance: 0,
         penalties: 0,
         gir: true,
         fairway: 'On'
       }, true);
       let round = realm.create('Round', {
         id: 1,
         roundNumber: 1,
       }, true);
     })
     return(
       <Router>
       <Scene key="root">
          <Scene key="tabbar" tabs="true">
            <Scene key="holeListViewKey" component={holeListView} title="Stats" icon={TabIcon} iconName="ios-stats" hideNavBar={true} initial={true} leftTitle="New Rnd" />
            <Scene key="overview" component={overviewView} title="Overview" icon={TabIcon} iconName="ios-calendar"/>
            <Scene key="visualize" component={visualize} title="Visualize" icon={TabIcon} iconName="ios-pie" hideNavBar={true}/>
          </Scene>
          <Scene key="stats" component={statsView} title="Stats" hideNavBar={true}/>
          <Scene key="statsForOverview" component={statsViewOverview} title="Stats"/>
       </Scene>
     </Router>
   );
   }
 }
AppRegistry.registerComponent('Golf', () => Golf);
