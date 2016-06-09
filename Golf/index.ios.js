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
    newRound = (props) => {
        let holesObjects = realm.objects('Hole')
          if(holesObjects.length < 9){
            alert(this.props.round)
          }
          else{
            alert('Ok')
          }
        }
     return(
       <Router>
       <Scene key="root">
          <Scene key="tabbar" tabs="true">
            <Scene key="holeListViewKey" component={holeListView} title="Stats" icon={TabIcon} initial={true} onRight={newRound.bind()} rightTitle="Reset" />
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
