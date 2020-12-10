import {StyleSheet} from 'react-native';
import {BaseColor, BaseStyle} from '@config';

export default StyleSheet.create({
  btnClearSearch: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: '100%',
  },
  rowTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 10,
  },
  itemHistory: {
    marginTop: 5,
    padding: 5,
    marginRight: 10,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  majorModalWrapper: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 7,
  },
  majorModal: {
    alignItems: 'center',
    padding: 10,
  },
  gender: {
    marginTop: 10,
    fontFamily: 'Raleway',
    paddingTop: 5,
    paddingBottom: 5,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: '30%',
  },
  scrollableModalContent1: {
    height: 70,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
});
