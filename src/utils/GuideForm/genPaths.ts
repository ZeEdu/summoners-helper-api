import { RunesReforged } from '../../interfaces/RunesReforgedJSON';
import getFromRawJSON from '../getFromRawJSON';

const genPaths = () => {
   return getFromRawJSON('runesReforged') as RunesReforged[];
};

export default genPaths;
