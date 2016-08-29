
'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class TabIcon extends Component {
  static propTypes = {
    selected: React.PropTypes.bool,
    last: React.PropTypes.bool,
    title: React.PropTypes.string
  };

  render(){
    const containerStyles = {
      borderRightWidth: this.props.last ? 0 : 1,
      backgroundColor: this.props.selected ? '#1a9274' : 'white'
    };

    const textStyles = {
      color: this.props.selected ? '#ffffff' : '#1a9274'
    };

    const iconColor = this.props.selected ? '#ffffff' : '#1a9274';

    return (
      <View style={[styles.container, containerStyles]}>
        <Icon name={this.props.iconName} style={styles.icon} size={22} backgroundColor="transparent" color={iconColor} />
        <Text style={[styles.text, textStyles]}>{this.props.title.toUpperCase()}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    borderColor: '#1a9274',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  text: {
    fontSize: 10
  },
  icon: {
    marginBottom: 4
  }
});
