
import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function DetalhesPais() {
    const { codigo } = useLocalSearchParams();

    const [pais, setPais] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        if (codigo) {
            buscarPais();
        } else {
            setErro('Código do país não informado.');
            setCarregando(false);
        }
    }, [codigo]);

    async function buscarPais() {
        try {
            setCarregando(true);
            setErro('');
            setPais(null);

            const codigoPais = Array.isArray(codigo)
                ? codigo[0]
                : codigo;

            const resposta = await fetch(
                `https://restcountries.com/v3.1/alpha/${codigoPais}?fields=name,flags,flag,capital,continents,region,subregion,population,languages,currencies,idd`
            );

            if (!resposta.ok) {
                throw new Error('Não foi possível encontrar o país.');
            }

            const resultado = await resposta.json();

            const dadosPais = Array.isArray(resultado)
                ? resultado[0]
                : resultado;

            if (!dadosPais || !dadosPais.name) {
                throw new Error('País não encontrado.');
            }

            setPais(dadosPais);
        } catch (error) {
            console.log('Erro ao buscar país:', error);
            setErro(error.message || 'Erro ao buscar informações do país.');
        } finally {
            setCarregando(false);
        }
    }

    if (carregando) {
        return (
            <View style={styles.centralizado}>
                <ActivityIndicator
                    size="large"
                    color="#7057a6"
                />

                <Text style={styles.carregando}>
                    Carregando informações...
                </Text>
            </View>
        );
    }

    if (erro || !pais) {
        return (
            <View style={styles.centralizado}>
                <Text style={styles.erroEmoji}>
                    ⚠️
                </Text>

                <Text style={styles.erro}>
                    {erro || 'País não encontrado.'}
                </Text>

                <Text style={styles.codigo}>
                    Código recebido: {codigo || 'não informado'}
                </Text>
            </View>
        );
    }

    const idiomas = pais.languages
        ? Object.values(pais.languages).join(', ')
        : 'Não informado';

    const moedas = pais.currencies
        ? Object.values(pais.currencies)
            .map((moeda) =>
                `${moeda.name}${moeda.symbol ? ` (${moeda.symbol})` : ''}`
            )
            .join(', ')
        : 'Não informado';

    const telefone = pais.idd?.root
        ? `${pais.idd.root}${pais.idd.suffixes?.[0] || ''}`
        : 'Não informado';

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
        >
            <View style={styles.cardPrincipal}>
                <Text style={styles.bandeira}>
                    {pais.flag || '🌎'}
                </Text>

                <Text style={styles.nome}>
                    {pais.name.common}
                </Text>

                <Text style={styles.nomeOficial}>
                    {pais.name.official}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Capital</Text>
                <Text style={styles.valor}>
                    {pais.capital?.[0] || 'Não informado'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Continente</Text>
                <Text style={styles.valor}>
                    {pais.continents?.[0] || 'Não informado'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Região</Text>
                <Text style={styles.valor}>
                    {pais.region || 'Não informado'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Sub-região</Text>
                <Text style={styles.valor}>
                    {pais.subregion || 'Não informado'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>População</Text>
                <Text style={styles.valor}>
                    {pais.population != null
                        ? pais.population.toLocaleString('pt-BR')
                        : 'Não informado'}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Idiomas</Text>
                <Text style={styles.valor}>
                    {idiomas}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Moedas</Text>
                <Text style={styles.valor}>
                    {moedas}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Código de telefone</Text>
                <Text style={styles.valor}>
                    {telefone}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfdef'
    },
    conteudo: {
        padding: 20,
        paddingBottom: 30
    },
    cardPrincipal: {
        backgroundColor: '#fcfdef',
        padding: 20,
        borderRadius: 16,
        marginBottom: 15,
        elevation: 2,
        alignItems: 'center'
    },
    bandeira: {
        fontSize: 80,
        marginBottom: 15
    },
    nome: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#7057a6',
        marginBottom: 6
    },
    nomeOficial: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#fff',
        padding: 17,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 2
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7057a6',
        marginBottom: 7
    },
    valor: {
        fontSize: 17,
        color: '#333',
        lineHeight: 24
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
        color: '#666'
    },
    erroEmoji: {
        fontSize: 45,
        marginBottom: 15
    },
    erro: {
        fontSize: 17,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10
    },
    codigo: {
        fontSize: 14,
        color: '#777'
    }
});