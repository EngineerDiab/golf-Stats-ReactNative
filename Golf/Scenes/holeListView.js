// import {Container, Content, Header, Title, Button, Icon} from 'native-base';
// import { Col, Row, Grid } from "react-native-easy-grid";
import React, { Component } from 'react';
// import FullStrokeSlider from './Components/sliders/FullStrokeSlider';
// import HalfStrokeSlider from './Components/sliders/HalfStrokeSlider';
// import PutsSlider from './Components/sliders/PutsSlider';
// import FirstPutSlider from './Components/sliders/FirstPutSlider';
// import PenaltiesSlider from './Components/sliders/PenaltiesSlider';
// import ListViewPaging from './Components/ListViewPaging/ListViewPaging';
// import FairwayButtonLeft from './Components/FairwayButtons/FairwayButtonLeft';
// import FairwayButtonRight from './Components/FairwayButtons/FairwayButtonRight';
// import FairwayButtonStraight from './Components/FairwayButtons/FairwayButtonStraight';
import {
  AppRegistry,
  TabBarIOS,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
} from 'react-native'

export default class holeListView extends Component {
  constructor () {
  super();
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows(['row1', 'row2'])
  };
}


render() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  );
}
}
//   constructor(){
//     super();
//     this.state = {selectedTab: 'tabOne'}
//   }
//   setTab(tabId){
//     this.setState({selectedTab: tabId})
//   }
//   render(){
//     return(
//       <TabBarIOS>
//         <TabBarIOS.Item systemIcon="history"
//           selected={this.state.selectedTab === 'tabOne'}
//           onPress={()=>this.setTab('tabOne')}>
//           <View style={styles.tabContent}>
//             <ListViewPaging />
//           </View>
//         </TabBarIOS.Item>
//         <TabBarIOS.Item systemIcon="favorites"
//           selected={this.state.selectedTab === 'tabTwo'}
//           onPress={()=>this.setTab('tabTwo')}>
//           <Container>
//             <Header>
//               <Title>Hole 1</Title>
//             </Header>
//             <Content>
//               <Grid>
//                 <Row>
//                   <Col>
//                     <FullStrokeSlider />
//                     <HalfStrokeSlider />
//                     <PutsSlider />
//                     <FirstPutSlider />
//                     <PenaltiesSlider />
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col>
//                     <FairwayButtonLeft/>
//                   </Col>
//                   <Col>
//                     <FairwayButtonStraight />
//                   </Col>
//                   <Col>
//                     <FairwayButtonRight />
//                   </Col>
//                 </Row>
//               </Grid>
//             </Content>
//           </Container>
//         </TabBarIOS.Item>
//         <TabBarIOS.Item systemIcon="history"
//           selected={this.state.selectedTab === 'tabThree'}
//           onPress={()=>this.setTab('tabThree')}>
//           <View style={styles.tabContent}>
//             <Text style={styles.tabText}>Tab Three</Text>
//           </View>
//         </TabBarIOS.Item>
//         <TabBarIOS.Item systemIcon="more"
//           selected={this.state.selectedTab === 'tabFour'}
//           onPress={()=>this.setTab('tabFour')}>
//           <View style={styles.tabContent}>
//             <Text style={styles.tabText}>Tab Four</Text>
//           </View>
//         </TabBarIOS.Item>
//       </TabBarIOS>
//     );
//   }
// }
//
//
//
const styles = StyleSheet.create({
  tabContent: {
    flex:1,
    alignItems:'center'
  },
  sliderBlock: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10

  },
  tabText:{
    margin:50,
    fontSize:45
  }
});
