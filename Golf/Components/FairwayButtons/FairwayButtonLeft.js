var Button = require('react-native-button');
import Icon from 'react-native-vector-icons/FontAwesome';
var React = require('react');
import {
  StyleSheet
} from 'react-native';

var FairwayButtonLeft = React.createClass({
  render() {
    return (
      <Button containerStyle={{padding:10, height:200, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}}
                   style={{fontSize: 20, color: 'green'}}>
                   <Icon name = "long-arrow-left" size={70} color="#ea3a3a" style={styles.container}/>
      </Button>
    );
  },

  _handlePress(event) {
    console.log('Pressed!');
  },
});

var styles = StyleSheet.create({
  container: {
    transform: [{rotate: '60deg'}],
    padding: 10
  },
});

module.exports = FairwayButtonLeft;
