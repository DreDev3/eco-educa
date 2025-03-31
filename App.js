import { Component } from 'react';
import { View, StyleSheet,ImageBackground } from 'react-native';

import Login from './src/components/Login/Index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      input: '',
    };

  }

  render() {

    return (
      <View style={styles.container}>
          <ImageBackground
            source={require('./assets/images/background.png')}
            style={styles.img}
          />
          <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#77C7D9',
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

