/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {AppRegistry, Text} from 'react-native';
 import {Scene, Router, Actions} from 'react-native-router-flux';
 import holeListView from './Scenes/holeListView';
 import statsView from './Scenes/statsView';
 import overviewView from './Scenes/overviewView';
 import realm from './Scenes/realm';


 class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

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
         fairway: 'On'
       }, true);
       let round = realm.create('Round', {
         id: 1,
         roundNumber: 1,
       }, true);
     })
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
       <Router>
       <Scene key="root">
          <Scene key="tabbar" tabs="true">
            <Scene key="holeListViewKey" component={holeListView} title="Stats" icon={TabIcon} initial={true} onLeft={newRound.bind()} leftTitle="New Rnd" />
            <Scene key="overview" component={overviewView} title="Overview" icon={TabIcon}/>
            <Scene key="home" component={holeListView} title="Visualize" icon={TabIcon}/>
          </Scene>
          <Scene key="stats" component={statsView} title="Stats"/>
       </Scene>
     </Router>
   );
   }
 }
AppRegistry.registerComponent('Golf', () => Golf);
