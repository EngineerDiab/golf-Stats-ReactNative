/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//import {Container, Header, Content, Footer, Title, Icon} from 'native-base';
import React, { Component } from 'react';
import FullStrokeSlider from './Components/sliders/FullStrokeSlider';
import HalfStrokeSlider from './Components/sliders/HalfStrokeSlider';
import PutsSlider from './Components/sliders/PutsSlider';
import FirstPutSlider from './Components/sliders/FirstPutSlider';
import PenaltiesSlider from './Components/sliders/PenaltiesSlider';
import {
  AppRegistry,
  TabBarIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Golf extends Component {
  constructor(){
    super();
    this.state = {selectedTab: 'tabOne'}
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }
  render(){
    return(
      <TabBarIOS>
        <TabBarIOS.Item systemIcon="history"
          selected={this.state.selectedTab === 'tabOne'}
          onPress={()=>this.setTab('tabOne')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Tab One</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="favorites"
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={()=>this.setTab('tabTwo')}>
          <View style={styles.tabContent}>
            <FullStrokeSlider />
            <HalfStrokeSlider />
            <PutsSlider />
            <FirstPutSlider />
            <PenaltiesSlider />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="history"
          selected={this.state.selectedTab === 'tabThree'}
          onPress={()=>this.setTab('tabThree')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Tab Three</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="more"
          selected={this.state.selectedTab === 'tabFour'}
          onPress={()=>this.setTab('tabFour')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Tab Four</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}



const styles = StyleSheet.create({
  tabContent: {
    flex:1,
    //alignItems:'center'
  },
  tabText:{
    margin:50,
    fontSize:45
  }
});

AppRegistry.registerComponent('Golf', () => Golf);
