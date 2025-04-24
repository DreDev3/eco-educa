import React, { useState } from "react";
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ImageBackground,
} from "react-native";
import { useFonts, Jersey10_400Regular } from "@expo-google-fonts/jersey-10";

import Register from "../Register/Index";
import Perfil from "../Perfil/Index";

export default function Login() {
    const [cadastrarImg, setCadastrarImg] = useState(require('../../../assets/images/cadastrar.png'));
    const [loginImg, setLoginImg] = useState(require('../../../assets/images/login.png'));
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
    const [modalProfileVisible, setModalProfileVisible] = useState(false);

    const [fontsLoaded] = useFonts({
        Jersey10: Jersey10_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.form}>
                    {/* Input E-mail */}
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                        resizeMode="cover"
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
                            placeholderTextColor="#8C472E"
                        />
                    </ImageBackground>

                    {/* Input Senha */}
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                        resizeMode="cover"
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Senha"
                            placeholderTextColor="#8C472E"
                            secureTextEntry
                        />
                    </ImageBackground>

                    {/* Botões: Cadastrar e Login */}
                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={1}
                            onPressIn={() => setCadastrarImg(require('../../../assets/images/cadastrar_hover.png'))}
                            onPressOut={() => {
                                setCadastrarImg(require('../../../assets/images/cadastrar.png'));
                                setModalRegisterVisible(true);
                            }}
                        >
                            <Image source={cadastrarImg} style={{ width: 150, height: 40 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={1}
                            onPressIn={() => setLoginImg(require('../../../assets/images/login_hover.png'))}
                            onPressOut={() => {
                                setLoginImg(require('../../../assets/images/login.png'))
                                setModalProfileVisible(true);
                            }}
                        >
                            <Image source={loginImg} style={{ width: 110, height: 40 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Modal com Componente Register */}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalRegisterVisible}
                        onRequestClose={() => setModalRegisterVisible(false)}
                    >
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                            {modalRegisterVisible && <Register onClose={() => setModalRegisterVisible(false)} />}
                        </View>
                    </Modal>

                    {/* Modal com Componente Perfil */}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalProfileVisible}
                        onRequestClose={() => setModalProfileVisible(false)}
                    >
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                            {modalProfileVisible && <Perfil onClose={() => setModalProfileVisible(false)} />}
                        </View>
                    </Modal>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    inputBackground: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    textInput: {
        fontFamily: "Jersey10",
        color: "#8C472E",
        fontSize: 22,
        paddingHorizontal: 10,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
    },
    btn: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
