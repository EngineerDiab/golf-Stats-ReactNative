/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import {AppRegistry, Text} from 'react-native';
 import {Scene, Router} from 'react-native-router-flux';
 import holeListView from './Scenes/holeListView';
 import statsView from './Scenes/statsView';
 import realm from './Scenes/realm';

 class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

 class Golf extends React.Component {
   render() {
     var numberOfHolesPlayed = function(){
       return (realm.objects('Hole').length)
     }
     var currentRound = realm.objects('Round').filtered('done CONTAINS "no"').slice('0','1')
     var holesArray = realm.objects('Hole').slice('0',realm.objects('Hole').length)
    //  var addHolesToRound = function(){
    //    realm.write(() => currentRound.holes.push(object))
    //  }
     exportRound = () => {
        let holesObjects = realm.objects('Hole')
          if(holesObjects.length < 9){
            alert('Enter stats for at least 9 holes please')
          }
          else{
            //var sortedHoles = holesObjects.sorted('id')
            //realm.objects('Hole').forEach(addHolesToRound, this)
            // currentRound[0].holes.push({
            //   id:  1
            // })
            //console.log(holesArray)
            for(var i = 0; i < realm.objects('Hole').length; i++){
               realm.write(()=> currentRound[0].holes.push({
                 id:  holesArray[i].id,
                 fullStroke: holesArray[i].fullStroke,
                 halfStroke: holesArray[i].halfStroke,
                 puts: holesArray[i].puts,
                 firstPutDistance: holesArray[i].firstPutDistance,
                 penalties: holesArray[i].penalties,
                 fairway: 'On'
               }))
             }
          }
        }
     return(
       <Router>
       <Scene key="root">
          <Scene key="tabbar" tabs="true">
            <Scene key="holeListViewKey" component={holeListView} title="Stats" icon={TabIcon} initial={true} onRight={exportRound.bind()} rightTitle="Reset" />
            <Scene key="register" component={holeListView} title="Overview" icon={TabIcon}/>
            <Scene key="home" component={holeListView} title="Visualize" icon={TabIcon}/>
          </Scene>
          <Scene key="stats" component={statsView} title="Stats"/>
       </Scene>
     </Router>
   );
   }
 }
AppRegistry.registerComponent('Golf', () => Golf);
