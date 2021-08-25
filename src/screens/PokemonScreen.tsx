import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { top } = useSafeAreaInsets();

    const { simplePokemon, color } = route.params;
    const { name, id, picture } = simplePokemon;

    const { isLoading, pokemon: fullPokemon } = usePokemon(id); 

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                    ...styles.headerContainer,
                    backgroundColor: color
                }}>
                <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress = { () => navigation.pop() }
                    style={{
                        ...styles.backButton,
                        top: top + 5
                    }}
                >
                    <Icon 
                        name="arrow-back-outline"
                        color="white"
                        size={ 35 }
                    />
                </TouchableOpacity>

                <Text 
                    style={{
                        ...styles.pokemonName,
                        top: top + 40
                    }}
                >
                    { name + "\n"} #{ id }
                </Text>

                <Image 
                    source={ require('../assets/pokebola-blanca.png')}
                    style={ styles.pokeballImage}
                />
                <FadeInImage 
                    uri={ picture }
                    style={ styles.pokemonImage }
                />
            </View>
            
            {
                isLoading ? (
                    <View style={ styles.loadingIndicator }>
                        <ActivityIndicator 
                            color={ color }
                            size={ 50 }
                        />
                    </View>
                )
                :
                    <PokemonDetails pokemon={ fullPokemon } />
                
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        alignItems: 'center',
        zIndex: 999,
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000
    },
    backButton: {
        position: 'absolute',
        left: 20
    },
    pokemonName: {
        fontSize: 40,
        color: 'white',
        alignSelf: 'flex-start',
        left: 20
    },
    pokeballImage:{
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7
    },
    pokemonImage: {
        height: 200,
        width: 200,
        position: 'absolute',
        bottom: 0,
        left: 50
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})