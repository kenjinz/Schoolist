import {get} from '../../utils';

export async function getUniversities(params) {
  return get('/universities', params);
}
