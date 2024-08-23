import React, { useState } from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import PAList from './List/PAList';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import BudgetSaving from './BudgetDetail/BudgetSaving';
import Graph from './Graph/Graph';

const Saving = ({modal,OpenSavingModal,Savingmodalfunction}) => {
  const [StateActual, setStateActual] = useState();
  const [StatePlanned, setStatePlanned] = useState();
  const [SwitchGraph, setSwitchGraph] = useState(false);
  const [RelationList, setRelationList] = useState(false);

  const GetEssentialFunction = (ActualValue, PlannedValue, Relationname) => {
    setStateActual(ActualValue);
    setStatePlanned(PlannedValue);
    setRelationList(Relationname);
    setSwitchGraph(true);

  };

  const ChangingView = data => {
    setSwitchGraph(false);
  };
    return (
      <View style={{flex: 1}}>
      <Modal
        style={{
          height: '60%',
          margin: 0,
          justifyContent: 'flex-end',
        }}
        isVisible={modal}
        animationIn="slideInUp"
        propagateSwipe={true}
        animationInTiming={500}
        swipeThreshold={300}
        onSwipeComplete={() => Savingmodalfunction()}
        swipeDirection={['down']}>
         <View
          style={{
            backgroundColor: '#fff',
            height: '80%',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <IconMC name="minus" size={40} />
          </View>
          <ScrollView
            nestedScrollEnabled={true}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
              {SwitchGraph ? (
                <Graph
                  StateActual={StateActual}
                  StatePlanned={StatePlanned}
                  ChangingView={ChangingView}
                  RelationList={RelationList}
                />
              ) : (
                <BudgetSaving
                  GetEssentialFunction={GetEssentialFunction}
                  ChangingView={ChangingView}
                />
              )}
            </View>
          </ScrollView>
        </View>

      </Modal>
    </View>
    )
}

export default Saving
