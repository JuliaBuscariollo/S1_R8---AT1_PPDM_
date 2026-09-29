
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Inicio() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.conteudo}>
                <Text style={styles.emoji}>
                    🌎
                </Text>

                <Text style={styles.titulo}>
                    Explorando o mundo
                </Text>

                <Text style={styles.subtitulo}>
                    Conheça países do mundo inteiro
                </Text>

                <Text style={styles.descricao}>
                    Consulte informações sobre países,
                    capitais, população, idiomas,
                    moedas e muito mais.
                </Text>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => router.push('/paises')}
                >
                    <Text style={styles.textoBotao}>
                        Explorar países
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfdef',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    conteudo: {
        width: '100%',
        alignItems: 'center'
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20
    },
    titulo: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#2657dc',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitulo: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15
    },
    descricao: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 35
    },
    botao: {
        backgroundColor: '#2657dc',
        paddingVertical: 16,
        paddingHorizontal: 35,
        borderRadius: 14,
        elevation: 4
    },
    textoBotao: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    }
});