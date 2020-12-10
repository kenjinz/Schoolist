import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  view: {
    justifyContent: 'center',
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
