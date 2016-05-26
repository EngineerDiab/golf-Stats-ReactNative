var Button = require('react-native-button');
import Icon from 'react-native-vector-icons/FontAwesome';
var React = require('react');
import {
  StyleSheet
} from 'react-native';

var FairwayButtonStraight = React.createClass({
  render() {
    return (
      <Button containerStyle={{padding:10, height:200, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
                   style={{fontSize: 20, color: 'green'}}>
                   <Icon name = "long-arrow-left" size={70} color="#2bcc12" style={styles.container}/>
      </Button>
    );
  },

  _handlePress(event) {
    console.log('Pressed!');
  },
});

var styles = StyleSheet.create({
  container: {
    transform: [{rotate: '90deg'}],
    padding: 10
  },
});

module.exports = FairwayButtonStraight;
