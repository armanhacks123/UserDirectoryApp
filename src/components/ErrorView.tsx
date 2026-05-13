import React from 'react';
import { View, Text, Button } from 'react-native';

const ErrorView = ({ onRetry }: any) => {
    return (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ marginBottom: 10 }}>Something went wrong</Text>
            <Button title="Retry" onPress={onRetry} />
        </View>
    );
};

export default ErrorView;