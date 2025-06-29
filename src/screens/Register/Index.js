import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
import axios from '../../services/axios';
import Toast from 'react-native-toast-message';

export default function Register({ onClose, navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = async () => {
        if (!nome || !email || !senha) {
            Toast.show({ type: 'info', text1: 'Atenção', text2: 'Preencha todos os campos.' });
            return;
        }
        try {
            await axios.post('/users', { nome, email, password: senha });
            Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Cadastro realizado com sucesso!' });
            // Fechar tela/modal
            if (onClose) onClose();
            else if (navigation) navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            Toast.show({ type: 'error', text1: 'Erro', text2: 'Não foi possível cadastrar. Tente novamente.' });
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/background.png')}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.form}>
                    {/** Nome **/}
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nome"
                            placeholderTextColor="#8C472E"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </ImageBackground>

                    {/** E-mail **/}
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
                            placeholderTextColor="#8C472E"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </ImageBackground>

                    {/** Senha **/}
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Senha"
                            placeholderTextColor="#8C472E"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </ImageBackground>

                    <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                        <Image
                            source={require('../../../assets/images/cadastrar.png')}
                            style={{ width: 150, height: 40 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtn} onPress={() => (onClose ? onClose() : navigation?.goBack())}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    form: {
        width: '100%',
        alignItems: 'center'
    },
    inputBackground: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10
    },
    textInput: {
        fontFamily: 'Jersey10',
        color: '#8C472E',
        fontSize: 22,
        paddingLeft: 10,
    },
    btn: {
        marginTop: 20,
        alignItems: 'center'
    },
    closeBtn: {
        marginTop: 30
    },
    closeText: {
        color: '#fff',
        fontFamily: 'Jersey10',
        fontSize: 26,
    },
});
