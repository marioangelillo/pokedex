import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import ImageColors from 'react-native-image-colors';

import { FadeInImage } from './FadeInImage';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props ) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true)
    
    const navigation = useNavigation<any>(); // el tipo any es solo para q deje de mostrar el error

    useEffect(() => {
        
        const colors = ImageColors.getColors( pokemon.picture, { fallback: 'grey' });
            colors.then( colors => {

                if( !isMounted.current ) return;

                colors.platform === 'android'
                 ? setBgColor( colors.dominant || 'grey' ) 
                 : setBgColor( colors.background || 'grey' )
            })

        return () => {
            isMounted.current = false;
        } 
    }, [])

    return (
    
        <TouchableOpacity
            activeOpacity={ 0.8 }
            onPress={ 
                () => navigation.navigate('PokemonScreen', {
                    simplePokemon: pokemon, 
                    color: bgColor 
                }) 
            }
        >
            <View
                style={{
                    ...styles.cardContainer,
                    width: windowWidth * 0.4,
                    backgroundColor: bgColor
                }}
            >
                <View>
                    <Text style={ styles.name }>
                        { pokemon.name }
                        { `\n#${ pokemon.id }` }
                    </Text>
                </View>

                <View style={ styles.pokebolaContainer }>
                    <Image 
                        source={ require('../assets/pokebola.png') }
                        style={ styles.pokebola}
                    />
                </View>

                <FadeInImage 
                    uri={ pokemon.picture }
                    style={ styles.pokemonImage }
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        height: 120,
        marginHorizontal: 10,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 20,
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        borderBottomRightRadius: 10,
        position: 'absolute',
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity: 0.5,
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
    }
})

