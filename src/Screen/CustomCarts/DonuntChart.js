import React, {useEffect, useRef} from 'react';
import {
  View,
  Animated,
  Dimensions,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import AnimatedNumbers from 'react-native-animated-numbers';


const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(Text);


const {width, height} = Dimensions.get('window');
const screenSize = Math.min(width, height);

const DonutChart = ({
  totalAmount, // Total amount
  spentAmount = totalAmount - spentAmount, // Amount spent today
  radius = (radius = screenSize * 0.30),
  strokeWidth = 10,
  duration = 1000,
  delay = 500,
  ChartRemainingAmount = totalAmount - spentAmount,
  remainingColor = '#D9EEFA', // Color for remaining amount
  spentColor = '#D9EEFA', // Color for spent amount
  TextColor = TextColor? TextColor : "red" 
}) => {

  const animatedValue = useRef(new Animated.Value(0)).current;
  const Circleref = useRef();
  const TextRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const [animateToNumber, setAnimateToNumber] = React.useState(0);

  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    });
  };

  useEffect(() => {
    let actualSpentAmount = spentAmount;
    if (spentAmount > totalAmount) {
      actualSpentAmount = totalAmount; // If spent amount exceeds total, set it to total
    } else if (spentAmount < 0) {
      actualSpentAmount = totalAmount; // If spent amount is negative, set it to total
    }
  
    const remaining = totalAmount - actualSpentAmount; // Remaining amount
    const percentageSpent = (remaining / totalAmount) * 100; // Percentage of amount spent
    const percentageRemaining = 100 - percentageSpent; // Percentage of remaining amount
    const anim = animation(percentageRemaining).start();

    animatedValue.addListener(v => {
      if (Circleref?.current) {
        const maxPerc = v.value;
        const strokeDashoffset = (circumference * maxPerc) / 100;
        Circleref.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if(TextRef?.current){
        TextRef.current.setNativeProps({
            text:`${Math.round(v.value)}`
        })
      }
    });

    return () => {
      // anim.stop();
      animatedValue.removeAllListeners();
    };
  }, [totalAmount,spentAmount]);

  useEffect(()=>{
    setTimeout(()=>{
        setAnimateToNumber(ChartRemainingAmount)
    },500)
    
  },[animateToNumber,totalAmount,spentAmount,ChartRemainingAmount])

  return (
    <View style={{width:width}}>
    <View style = {{justifyContent:"center",alignItems:"center"}}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle},${halfCircle}`}>
          {/* Circle for spent amount */}
          <Circle
            cx="50%"
            cy="50%"
            stroke={spentColor}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeOpacity={0.25}
          />

          {/* Animated circle for remaining amount */}
          <AnimatedCircle
            ref={Circleref}
            cx="50%"
            cy="50%"
            stroke={remainingColor}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${circumference}`}
            strokeLinecap="round"
          />
        </G>
      </Svg>

      <View style={{position:"absolute",left:0,top:0,bottom:0,right:0,alignItems: "center",justifyContent:"center"}}>
        <Text style={{fontSize:radius / 10,fontWeight:600,color:"#fff"}}>Safe To Spend</Text>
        <View style = {{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <Text style={{fontSize:radius / 4,color:"#fff"}}>₹ </Text>
        <AnimatedNumbers
        animationDuration={2000}
        includeComma={true}
        style={{fontSize:1,fontWeight:800,paddingVertical:4}}
        animateToNumber={animateToNumber}
        fontStyle={{ fontSize:radius / 4, fontWeight: 'bold',color:TextColor}}
      />
      </View>
        {/* <AnimatedText ref={TextRef}>$62000</AnimatedText> */}
        <Text style={{fontSize:radius / 10,color:"#fff"}}>Today</Text>
      </View>

    </View>
    </View>
  );
};

export default DonutChart;