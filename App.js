import { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TextInput, ImageBackground } from 'react-native';

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

        <View style={styles.background}>
          <ImageBackground
            source={require('./assets/images/background.png')}
            style={styles.img}
          />
        </View>
        <View style={styles.areaInput}>
          <TextInput style={styles.textInput} placeholder='E-mail'></TextInput>
          <TextInput style={styles.textInput} placeholder='Senha' />
        </View>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>
              Cadastrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>
              Logar
            </Text>
          </TouchableOpacity>
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
    flex: 1,
    width: '100%',
    backgroundColor: '#77C7D9',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: '100%',
    height: 450,
  },

  btnArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  btn: {
    marginTop: -700,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8C472E',
    borderRadius: 30,
    margin: 30
  },
  btnText: {
    width: 150,
    textAlign: 'center',
    fontSize: 26,
    color: '#ffffff',
    margin: 10
  },
  areaInput: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    marginTop: -1200,
    backgroundColor: '#7FA644', 
    width: 200,
    height: 40,
    borderRadius: 30,
    padding: 10
  }

});

