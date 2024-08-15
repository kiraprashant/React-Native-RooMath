import React , {useRef,useEffect} from 'react';
import { View, Text, StyleSheet ,Animated } from 'react-native';

const ProgressBar = ({ actual, expected = 0, height }) => {
    const actualPercentage = Math.min((actual / expected) * 100, 100);

  const scaleXValue = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.timing(scaleXValue, {
      toValue: actualPercentage / 100,
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [actual, expected]);

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { height }]}>
        <View style={styles.expected} />
        <Animated.View style={[styles.actual, { transform: [{ scaleX: scaleXValue }] }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
  },
  progressBar: {
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative', // Ensure correct positioning
  },
  expected: {
    backgroundColor: '#8b9dc3', // Expected color
    height: '100%',
    width: '100%', // Ensure the expected bar takes up full width
  },
  actual: {
    backgroundColor: '#3b5998', // Actual color
    height: '100%',
    position: 'absolute',
    left: 0, // Align to the left
    width: '100%', // Full width to apply scaleX correctly
    transformOrigin: 'left', // Ensure scaling happens from the left (if applicable)
  },
  labelContainer: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressBar;