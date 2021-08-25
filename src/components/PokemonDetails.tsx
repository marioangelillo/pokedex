import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FullPokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: FullPokemon;
}

export const PokemonDetails = ({ pokemon }: Props ) => {
    
    return (
        <ScrollView
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        >
            <View
                style={{
                    ...styles.container,
                    marginTop: 360
                }}
            >

                <Text style={ styles.title }>Types</Text>
                <View style={{ flexDirection: 'row'}}>
                    {
                        pokemon.types.map( ({ type }) => (
                            <Text
                                key={ type.name }
                                style={ styles.regularText }
                            >
                                {type.name}
                            </Text>
                        ))
                    }
                </View>

                <Text style={ styles.title }>Weight</Text>
                <Text style={ styles.regularText }>{ pokemon.weight }kg</Text>  

                <Text style={ styles.title }>Sprites</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                >
                    <FadeInImage 
                        uri={ pokemon.sprites.front_default}
                        style={ styles.basicSprite }
                    />
                    <FadeInImage 
                        uri={ pokemon.sprites.back_default}
                        style={ styles.basicSprite }
                    />
                    <FadeInImage 
                        uri={ pokemon.sprites.back_shiny}
                        style={ styles.basicSprite }
                    />
                    <FadeInImage 
                        uri={ pokemon.sprites.front_default}
                        style={ styles.basicSprite }
                    />
                </ScrollView>

                <Text style={ styles.title }>Moves</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                    {
                        pokemon.moves.map( ({ move }) => (
                            <Text
                                key={ move.name }
                                style={ styles.regularText }
                            >
                                {move.name}
                            </Text>
                        ))
                    }
                </View>

                <View style={{ alignItems: 'center'}}>
                    <FadeInImage 
                        uri={ pokemon.sprites.front_default}
                        style={{ 
                            ...styles.basicSprite,
                            marginVertical: 20
                        }}
                    />
                </View>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10
    },
    regularText: {
        fontSize: 19,
        marginRight: 10
    },
    basicSprite: {
        height: 100,
        width: 100
    }
})
