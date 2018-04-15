import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, FlatList, TextInput } from 'react-native';
import { Constants, WebBrowser } from "expo";

class AllSwappi extends React.Component {
    state = {
      data: []
    }
  
    componentWillMount() {
      this.fetchData();
    }
  
    fetchData = async () => {
      const response = await fetch("http://swapi.co/api/people");
      const json = await response.json();
      this.setState({ data: json.results });
    }
  
  
    static navigationOptions = { title: "test" }
    render() {
      return (
        <View>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>
      )
    }
  }

  export default AllSwappi;