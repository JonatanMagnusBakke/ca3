import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, FlatList, TextInput } from 'react-native';
import { Constants, WebBrowser } from "expo";

class OneUser extends React.Component {
    state = {
      user : {}
    }
  
    fetchData = async () => {
      const response = await fetch("");
      const json = await response.json();
      this.setState({ user: json });
    }
    static navigationOptions = { title: "OneUser" }
    render() {
      return (
        <View>
          <Text>Not working yet</Text>
        </View>)
    }
  }

  export default OneUser;