import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView, FlatList, TextInput } from 'react-native';
import { Constants, WebBrowser } from "expo";
import { StackNavigator } from 'react-navigation';
import allUsers from './screens/allUsers';
import allSwappi from './screens/allSwappi';
import oneUser from './screens/oneUser';
import oneSwappi from './screens/oneSwappi';


const Touchable = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>)



class HomeScreen extends React.Component {
  static navigationOptions = { title: 'CA3' };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View >
        <Text style={{ textAlign: "center", fontSize: 20 }}>See all Demos implemented by XXXX</Text>
        <Touchable onPress={() => navigate('allusers')} title="Get all users from backend" />
        <Touchable onPress={() => navigate('oneuser')} title="Get one user from the backend" />
        <Touchable onPress={() => navigate('swappi')} title="Get all people from Swappi" />
        <Touchable onPress={() => navigate('adminswappi')} title="Get one person from Swappi" />
      </View>
    )
  }
}

//export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />

export default class App extends React.Component {

  render() {
    return (
      <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />
    );
  }
}



const RouteStack = StackNavigator({
  Home: { screen: HomeScreen },
  allusers: { screen: allUsers },
  oneuser: { screen: oneUser },
  swappi: { screen: allSwappi },
  adminswappi: { screen: oneSwappi },
});

const styles = StyleSheet.create({
  button: {
    margin: 3,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 7,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  }
})