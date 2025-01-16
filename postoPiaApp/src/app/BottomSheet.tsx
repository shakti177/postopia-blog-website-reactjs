import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      console.log('scrollTo called with destination:', destination);
      active.value = destination !== 0;
      console.log('active.value set to:', active.value);
      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      console.log('isActive called, returning:', active.value);
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        console.log('Gesture started, current translateY:', translateY.value);
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
        console.log('Gesture update, translateY:', translateY.value);
      })
      .onEnd(() => {
        console.log('Gesture ended, final translateY:', translateY.value);
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          console.log('Should close sheet');
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          console.log('Should open sheet fully');
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolation.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });


    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0)
      }
    }, [])

    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: active.value ? 'auto' : 'none'
      } as any
    }, [])
    return (
      <>
        <Animated.View onTouchStart={() => {
          console.log('Backdrop touched');
          scrollTo(0)
        }}
          animatedProps={rBackdropProps} style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }, rBackdropStyle]} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={styles.line} />
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
