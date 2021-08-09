import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PokemonScreen } from '../screens/PokemonScreen';
import { HomeScreen } from '../screens/HomeScreen';

export const Navigator = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="HomeScreen" component={ HomeScreen } />
            <Stack.Screen name="PokemonScreen" component={ PokemonScreen } />
        </Stack.Navigator>
    )
}
