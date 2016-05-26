var React = require('react');
var Slider = require('react-native-slider');
var {
  StyleSheet,
  View,
  Text,
} = require('react-native');

var HalfStrokeSlider = React.createClass({
  getInitialState() {
    return {
      value: 0,
    };
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Half Swings: {this.state.value}</Text>
        <Slider
          value={this.state.value}
          minimumValue = {0}
          maximumValue = {3}
          step = {1}
          onValueChange={(value) => this.setState({value})} />

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});


module.exports = HalfStrokeSlider;
