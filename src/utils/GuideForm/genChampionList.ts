import { ChampionJSON } from '../../interfaces/ChampionJSON';
import getFromRawJSON from '../getFromRawJSON';

const genChampionList = () => {
   return Object.values((getFromRawJSON('champion') as ChampionJSON).data).map((el) => ({
      id: el.id,
      name: el.name,
   }));
};

export default genChampionList;
