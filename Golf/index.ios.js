/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {Container, Content, Header, Title} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import React, { Component } from 'react';
import FullStrokeSlider from './Components/sliders/FullStrokeSlider';
import HalfStrokeSlider from './Components/sliders/HalfStrokeSlider';
import PutsSlider from './Components/sliders/PutsSlider';
import FirstPutSlider from './Components/sliders/FirstPutSlider';
import PenaltiesSlider from './Components/sliders/PenaltiesSlider';
import ListViewPaging from './Components/ListViewPaging/ListViewPaging';
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
            <ListViewPaging />
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item systemIcon="favorites"
          selected={this.state.selectedTab === 'tabTwo'}
          onPress={()=>this.setTab('tabTwo')}>
          <Container>
            <Header>
              <Title>Hole 1</Title>
            </Header>
            <Content>
              <FullStrokeSlider style={styles.sliderBlock} />
              <HalfStrokeSlider />
              <PutsSlider />
              <FirstPutSlider />
              <PenaltiesSlider />
              <Grid>
                <Col style={{ backgroundColor: 'red', height: 200 }}></Col>
                <Col style={{ backgroundColor: '#4C746B', height: 200  }}></Col>
              </Grid>
            </Content>
          </Container>
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
  sliderBlock: {
    flex: 1

  },
  tabText:{
    margin:50,
    fontSize:45
  }
});

AppRegistry.registerComponent('Golf', () => Golf);
