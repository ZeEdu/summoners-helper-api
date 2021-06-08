import { ChampionJSON } from '../../interfaces/ChampionJSON';
import getFromRawJSON from '../getFromRawJSON';

const getChampionsList = () => {
   return Object.values((getFromRawJSON('champion') as ChampionJSON).data).map((el) => ({
      id: el.id,
      name: el.name,
      title: el.title,
   }));
};

export default getChampionsList;
