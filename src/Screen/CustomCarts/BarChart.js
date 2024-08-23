import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native';

const BarChart =({StateActual,StatePlanned})=> {
    const maxValue = Math.max(StateActual, StatePlanned);
    const expectedHeight = (StateActual / maxValue) * 100; // percentage of max value
    const plannedHeight = (StatePlanned / maxValue) * 100;
    return (
        <View style={{padding: 20, backgroundColor: '#f0f8ff',borderRadius:12}}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-end',
              height: 200,
              padding: 20,
              paddingBottom: 0,
            }}>
            <View style={styles.barContainer}>
              <Text style={styles.label}>{StatePlanned}</Text>
              <View
                style={[
                  styles.bar,
                  styles.plannedBar,
                  {height: `${plannedHeight}%`},
                ]}>
                <Text style={styles.barValue}></Text>
              </View>
            </View>

            <View style={styles.barContainer}>
              <Text style={styles.label}>{StateActual}</Text>
              <View
                style={[
                  styles.bar,
                  styles.expectedBar,
                  {height: `${expectedHeight}%`},
                ]}>
                <Text style={styles.barValue}></Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#eaeaea',
              marginHorizontal: 40,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.bottomText}>Planned</Text>
            <Text style={styles.bottomText}>Actual</Text>
          </View>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f0f8ff',
    },
    barContainer: {
      alignItems: 'center',
    },
    bar: {
      width: 70,
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal:8
    },
    expectedBar: {
      backgroundColor: '#d4ffcd', // Color for the Expected bar
    },
    plannedBar: {
      backgroundColor: '#cbefff', // Color for the Planned bar
    },
    label: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
    barValue: {
      color: '#fff',
      marginBottom: 5,
      fontWeight: 'bold',
    },
    bottomText:{
      width: 70,
      textAlign:"center",
      marginHorizontal:8
    }
  });

export default BarChart
