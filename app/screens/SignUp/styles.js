import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  genderModalWrapper: {
    alignSelf: 'center',
    width: '100%',
    height: 100,
    backgroundColor: 'white',
  },
  genderModal: {
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  gender: {
    marginTop: 10,
    fontFamily: 'Raleway',
    paddingTop: 5,
    paddingBottom: 5,
  },
});
