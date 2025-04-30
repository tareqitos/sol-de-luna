import React from 'react';
import { View } from 'react-native';
import CardSubtitle from './CardSubtitle';

export default function CardSection({ text, children, style }) {
    return (
        <View style={style}>
            {text && <CardSubtitle text={text} />}
            {children}
        </View>
    );
};
