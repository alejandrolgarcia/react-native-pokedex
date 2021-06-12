import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    onDebounce: (value: string) => void; 
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounce }:Props) => {

    const [textValue, setTextValue] = useState('');

    const debounceValue = useDebouncedValue(textValue);

    useEffect(() => {
        onDebounce(debounceValue);
    }, [debounceValue]);

    return (
        <View style={{
            ...styles.container,
            ...style as any,
            }}>
            <View style={ styles.textBackground }>
                <TextInput
                    placeholder="Buscar pokémon"
                    placeholderTextColor="grey"
                    style={{
                        ...styles.textInput,
                        top: (Platform.OS === 'ios') ? 0 : 2
                    }}
                    autoCapitalize="none"
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />

                <Icon
                    name="search-outline"
                    color="grey"
                    size={ 25 }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 20,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,

    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: 'black'
    }
});
