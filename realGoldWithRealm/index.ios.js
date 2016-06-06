 import React, { Component } from 'react';
 import {AppRegistry, Text} from 'react-native';
 import {Scene, Router} from 'react-native-router-flux';
 import holeListView from './Scenes/holeListView';
 import statsView from './Scenes/statsView';

 class TabIcon extends Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

 class realGoldWithRealm extends Component {
   render() {
     return(
       <Router>
       <Scene key="root">
          <Scene key="tabbar" tabs="true">
            <Scene key="holeListViewKey" component={holeListView} title="Stats" icon={TabIcon} initial={true}/>
            <Scene key="register" component={holeListView} title="Register" icon={TabIcon}/>
            <Scene key="home" component={holeListView} title="Potato" icon={TabIcon}/>
            <Scene key="Poop" component={holeListView} title="Poop" icon={TabIcon}/>
          </Scene>
          <Scene key="stats" component={statsView} title="Stats"/>
       </Scene>
     </Router>
   );
   }
 }

AppRegistry.registerComponent('realGoldWithRealm', () => realGoldWithRealm);
