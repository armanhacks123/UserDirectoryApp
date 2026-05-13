import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
    </View>
);

export default Loader;