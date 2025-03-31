import React, { Component } from "react";
import { View, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cadastrar: require('../../../assets/images/cadastrar.png'),
            login: require('../../../assets/images/login.png')
        }
        this.switchBtnCadastrar = this.switchBtnCadastrar.bind(this);
        this.switchBtnOutCadastrar = this.switchBtnOutCadastrar.bind(this);

        this.switchBtnLogin = this.switchBtnLogin.bind(this);
        this.switchBtnOutLogin = this.switchBtnOutLogin.bind(this);
    }
    switchBtnCadastrar() {
        this.setState({
            cadastrar: require('../../../assets/images/cadastrar_hover.png')
        })
    }
    switchBtnOutCadastrar() {
        this.setState({
            cadastrar: require('../../../assets/images/cadastrar.png')
        })
    }

    switchBtnLogin() {
        this.setState({
            login: require('../../../assets/images/login_hover.png')
        })
    }
    switchBtnOutLogin() {
        this.setState({
            login: require('../../../assets/images/login.png')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.areaInput}>
                    <TextInput style={styles.textInput} placeholder="E-mail" placeholderTextColor={'white'} />
                </View>
                <View style={styles.areaInput}>
                    <TextInput style={styles.textInput} placeholder='Senha' placeholderTextColor={'white'} />
                </View>

                <View style={styles.btnArea}>
                    {/*                     <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>
                            Cadastrar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>
                            Logar
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.btn} activeOpacity={1} onPressIn={this.switchBtnCadastrar} onPressOut={this.switchBtnOutCadastrar}>
                        <Image source={this.state.cadastrar} style={{ width: 150, height: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} activeOpacity={1} onPressIn={this.switchBtnLogin} onPressOut={this.switchBtnOutLogin}>
                        <Image source={this.state.login} style={{ width: 110, height: 40 }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '50%',
    },
    btnArea: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        marginTop: -1500,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 10,
    },
    btnText: {
        width: 150,
        textAlign: 'center',
        fontSize: 26,
        color: '#ffffff',
        margin: 10
    },
    areaInput: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        marginTop: -1800,
        backgroundColor: '#884B2B',
        opacity: 0.9,
        color: '#ffffff',
        width: 300,
        height: 50,
        borderRadius: 30,
        padding: 10,
        fontSize: 18
    }
})