import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonUser = () => {
    return (
        <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <View style={{ width: 55, height: 55, borderRadius: 30 }} />
                <View style={{ marginLeft: 10 }}>
                    <View style={{ width: 120, height: 15, borderRadius: 4 }} />
                    <View style={{ width: 180, height: 12, marginTop: 6 }} />
                </View>
            </View>
        </SkeletonPlaceholder>
    );
};

export default SkeletonUser;