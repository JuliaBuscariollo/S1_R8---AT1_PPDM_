import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7057a6'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="paises"
                options={{
                    title: 'Países'
                }}
            />

            <Stack.Screen
                name="detalhesPais"
                options={{
                    title: 'Detalhes do país'
                }}
            />
        </Stack>
    );
}
