import React from 'react';
import { Text, View, Platform, TouchableOpacity, StyleSheet, Button, WebView } from 'react-native';
import { Constants, WebBrowser } from "expo";
import { StackNavigator } from 'react-navigation';

class Login extends React.Component {
  static navigationOptions = { title: "Login" }
  render() {
    return (<View><Text>This will be the Login screen</Text></View>)
  }
}

class Logout extends React.Component {
  static navigationOptions = { title: "Logout" }
  render() {
    return (<View><Text>This will be the Logout screen</Text></View>)
  }
}

class Swappi extends React.Component {
  static navigationOptions = { title: "Swappi" }
  render() {
    return (
      <View>
        <Text>This will be the Swappi</Text>
      </View>
    )
  }
}

class AdminSwappi extends React.Component {
  static navigationOptions = { title: "AdminSwappi" }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>This will be the AdminSwappi</Text>
      </View>
    );
  }
}

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
        <Touchable onPress={() => navigate('login')} title="Login" />
        <Touchable onPress={() => navigate('logout')} title="Logout" />
        <Touchable onPress={() => navigate('swappi')} title="Swappi" />
        <Touchable onPress={() => navigate('adminswappi')} title="Admin Swappi" />
      </View>
    )
  }
}

export default App = () => <RouteStack style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight / 2 }} />

const RouteStack = StackNavigator({
  Home: { screen: HomeScreen },
  login: { screen: Login },
  logout: { screen: Logout },
  swappi: { screen: Swappi },
  adminswappi: { screen: AdminSwappi },
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