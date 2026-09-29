
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'https://api.restcountries.com/countries/v5?limit=100';

export default function Paises() {
    const router = useRouter();
    const [paises, setPaises] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        carregarPaises();
    }, []);

async function carregarPaises() {
  try {
    setCarregando(true);
    setErro('');

    const resposta = await fetch(API_URL, {
      headers: {
        Authorization: 'Bearer rc_live_demo',
      },
    });

    const dados = await resposta.json();

    console.log('STATUS:', resposta.status);
    console.log('RESPOSTA DA API:', dados);

    if (!resposta.ok) {
      throw new Error(dados.errors?.[0]?.message || 'Erro ao buscar países.');
    }

    const lista = dados.data?.objects || [];
setPaises(lista);
  } catch (error) {
    console.log('Erro ao buscar países:', error);
    setErro(error.message);
  } finally {
    setCarregando(false);
  }
}

   const paisesFiltrados = paises.filter((pais) =>
    (pais.names?.common || '')
        .toLowerCase()
        .includes(busca.toLowerCase())
);

    function abrirDetalhes(pais) {
        router.push({
            pathname: '/detalhesPais',
            params: {
                codigo: pais.cca3
            }
        });
    }

    function renderPais({ item }) {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => abrirDetalhes(item)}
                activeOpacity={0.8}
            >
                <Text style={styles.bandeira}>
                    {item.flag || '🌎'}
                </Text>

                <View style={styles.informacoes}>
                    <Text style={styles.nome}>
                        {item.name.common}
                    </Text>

                    <Text style={styles.regiao}>
                        {item.region || 'Região não informada'}
                    </Text>

                    <Text style={styles.continente}>
                        {item.continents?.[0] || 'Continente não informado'}
                    </Text>
                </View>

                <Text style={styles.seta}>›</Text>
            </TouchableOpacity>
        );
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator
                    size="large"
                    color="#2657dc"
                />

                <Text style={styles.carregando}>
                    Carregando países...
                </Text>
            </View>
        );
    }

    if (erro) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.erroEmoji}>⚠️</Text>

                <Text style={styles.erro}>
                    {erro}
                </Text>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={carregarPaises}
                >
                    <Text style={styles.botaoTexto}>
                        Tentar novamente
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Explorar países
            </Text>

            <Text style={styles.subtitulo}>
                Encontre um país para conhecer suas informações.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Pesquisar país..."
                placeholderTextColor="#888"
                value={busca}
                onChangeText={setBusca}
            />

            <Text style={styles.quantidade}>
                {paisesFiltrados.length} países encontrados
            </Text>

            <FlatList
                data={paisesFiltrados}
                keyExtractor={(item) => item.cca3}
                renderItem={renderPais}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.lista}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfdef',
        padding: 20
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2657dc',
        marginBottom: 5
    },
    subtitulo: {
        fontSize: 15,
        color: '#587de3',
        marginBottom: 15
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 13,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10
    },
    quantidade: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10
    },
    lista: {
        paddingBottom: 20
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 14,
        elevation: 2
    },
    bandeira: {
        fontSize: 40,
        marginRight: 15
    },
    informacoes: {
        flex: 1
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    regiao: {
        fontSize: 14,
        color: '#2657dc',
        marginTop: 4
    },
    continente: {
        fontSize: 13,
        color: '#2657dc',
        marginTop: 2
    },
    seta: {
        fontSize: 30,
        color: '#2657dc'
    },
    centralizado: {
        flex: 1,
        backgroundColor: '#fcfdef',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    carregando: {
        marginTop: 12,
        fontSize: 16,
        color: '#2657dc'
    },
    erroEmoji: {
        fontSize: 45,
        marginBottom: 15
    },
    erro: {
        fontSize: 17,
        color: '#2657dc',
        textAlign: 'center',
        marginBottom: 20
    },
    botao: {
        backgroundColor: '#2657dc',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 10
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold'
    }
});