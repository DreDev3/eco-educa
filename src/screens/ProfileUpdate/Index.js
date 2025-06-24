// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import {
    View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ImageBackground,
} from 'react-native';
import axios from '../../services/axios'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function UpdateUser({ onClose, updateName }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    setNome(decoded.nome || '');
                    setEmail(decoded.email || '');
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };

        carregarDados();
    }, []);

    const handleUpdate = async () => {
        if (!nome || !email) {
            Toast.show({ type: 'info', text1: 'Preencha todos os campos obrigatórios.' });
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.put('/users', {
                nome, email, password: senha || undefined,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Toast.show({ type: 'success', text1: 'Dados atualizados com sucesso!' });
            updateName(nome);
            if (onClose) onClose();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            Toast.show({ type: 'error', text1: 'Erro ao atualizar.' });
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/background.png')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.form}>
                    {/* Nome */}
                    <ImageBackground source={require('../../../assets/images/Sprite-0001.png')} style={styles.inputBackground}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nome"
                            placeholderTextColor="#8C472E"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </ImageBackground>

                    {/* Email */}
                    <ImageBackground source={require('../../../assets/images/Sprite-0001.png')} style={styles.inputBackground}>
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

                    {/* Senha */}
                    <ImageBackground source={require('../../../assets/images/Sprite-0001.png')} style={styles.inputBackground}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Senha (opcional)"
                            placeholderTextColor="#8C472E"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </ImageBackground>

                    <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
                        <Image
                            source={require('../../../assets/images/editar.png')}
                            style={{ width: 150, height: 45 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    form: { width: '100%', alignItems: 'center' },
    inputBackground: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    textInput: {
        fontFamily: 'Jersey10',
        color: '#8C472E',
        fontSize: 22,
        paddingLeft: 10,
    },
    btn: { marginTop: 20, alignItems: 'center' },
    closeBtn: { marginTop: 30 },
    closeText: { color: '#fff', fontFamily: 'Jersey10', fontSize: 26 },
});
