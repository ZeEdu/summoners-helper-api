import { SingleChampionJSON } from '../../interfaces/SingleChampionJSON';
import getFromRawJSON from '../getFromRawJSON';

const getChampionData = (id: string) => {
   return (getFromRawJSON(`champion/${id}`) as SingleChampionJSON).data;
};

export default getChampionData;
