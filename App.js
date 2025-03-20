import { Component } from 'react';
import { Button, Text, View, StyleSheet, TextInput, Image } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      input: '',
    };

    this.entrar = this.entrar.bind(this);
  }

  entrar() {
    this.setState({
      nome: 'Bem vindo, ' + this.state.input,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.background}>
        <Image source={{ uri: require('./assets/images/background.png') }} 
        style={{ width: '100%'}} />
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  background: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: '95%',
    height: '80%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: 0,
    margin: 'auto',
  },

});

