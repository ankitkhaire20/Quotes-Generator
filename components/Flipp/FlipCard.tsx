import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    BounceInUp,
    Extrapolation,
} from 'react-native-reanimated';
import RegularContent from './RegularContent';
import FlippedContent from './FlippedContent';

interface FlipCardProps {
    quotes: string;
    onPress: any;
    liked: any;
    cardStyle: any,
    direction: any,
}

const FlipCard: React.FC<FlipCardProps> = (props) => {



    const { quotes, liked, cardStyle, direction = 'x' } = props;
    const isDirectionX = direction === 'x';

    // Shared value for animation
    const flipAnimation = useSharedValue(0);


    useEffect(() => {
        // Animate the flip when `liked` changes
        flipAnimation.value = withTiming(liked ? 260 : 0, { duration: 500 });
    }, [liked]);


    // Front card animated style
    const frontStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(
            flipAnimation.value,
            [0, 180],
            [0, 180],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ rotateY: `${rotateValue}deg` }], // Rotate on Y-axis
            backfaceVisibility: 'hidden',
        };
    });

    // Back card animated style
    const backStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(
            flipAnimation.value,
            [0, 180],
            [180, 360],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ rotateY: `${rotateValue}deg` }], // Rotate on Y-axis
            backfaceVisibility: 'hidden',
        };
    });

    return (
        <Animated.View style={styles.cardContainer} entering={BounceInUp} >
            {/* Front Side */}
            <Animated.View style={[styles.regularCard, cardStyle, frontStyle]}>
                <RegularContent quotes={quotes} />
            </Animated.View>

            {/* Back Side */}
            <Animated.View style={[styles.flippedCard, cardStyle, backStyle]}>
                <FlippedContent quotes={quotes} />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        // width: '100%',
        // height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    regularCard: {
        position: 'absolute',
        zIndex: 1,
    },
    flippedCard: {
        backfaceVisibility: 'hidden',
        zIndex: 2,
    },
});

export default FlipCard;
