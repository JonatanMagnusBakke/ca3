import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, FlatList, TextInput } from 'react-native';
import { Constants, WebBrowser } from "expo";


class AllUsers extends React.Component {

    state = {
      users: []
    }
  
    static navigationOptions = { title: "Get all users" }
  
    fetchData = async () => {
      const response = await fetch("");
      const json = await response.json();
      this.setState({ users: json });
    }
  
    render() {
      return (
        <View>
          <Text>Not working yet</Text>
          <FlatList
            data={this.state.users}
            keyExtractor={(x, i) => i}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>)
    }
  }

  export default AllUsers;