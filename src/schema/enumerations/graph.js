import { map } from 'lodash';
import * as enumerations from './';

export default {
  type: map(enumerations, (values, name) =>
    `enum ${name} { ${values.join(',')} }`
  ).join('\n'),
};
