import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, FlatList, TextInput } from 'react-native';
import { Constants, WebBrowser } from "expo";

class OneSwappi extends React.Component {
    state = {
      data: {}
    }
  
    componentWillMount() {
      this.fetchData("1");
    }
  
    fetchData = async (personId) => {
      const response = await fetch("http://swapi.co/api/people/" + personId);
      const json = await response.json();
      this.setState({ data: json });
    }
  
    static navigationOptions = { title: "SwappiAdmin" }
    render() {
      return (
  
        <View>
          <TextInput placeholder="Type number from 1 -8" onChangeText={(text) => this.fetchData(text)} />
          <Text>Name: {this.state.data.name}</Text>
          <Text>Height in cm: {this.state.data.height}</Text>
          <Text>Mass: {this.state.data.mass}</Text>
          <Text>Hair color: {this.state.data.hair_color}</Text>
        </View>
      )
    }
  }

  export default OneSwappi;