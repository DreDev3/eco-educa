import React from "react";
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
} from "react-native";

export default function Register({ onClose }) {
    return (
        <ImageBackground
            source={require("../../../assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.form}>
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                        resizeMode="cover"
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Nome"
                            placeholderTextColor="#8C472E"
                        />
                    </ImageBackground>
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
                        />
                    </ImageBackground>

                    <TouchableOpacity style={styles.btn}>
                        <Image
                            source={require("../../../assets/images/cadastrar.png")}
                            style={{ width: 150, height: 40 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose}>
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
    textInput: {
        fontFamily: "Jersey10",
        opacity: 0.9,
        color: "#8C472E",
        width: 300,
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 25,
        fontSize: 22,
        marginVertical: 10,
    },
    btn: {
        marginTop: 20,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    closeText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 30,
        fontSize: 16,
        textDecorationLine: "underline",
    },
});
