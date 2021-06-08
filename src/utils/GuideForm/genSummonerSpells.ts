import { SummonerJSON } from '../../interfaces/SummonerJSON';
import getFromRawJSON from '../getFromRawJSON';

const genSummonerSpells = () => {
   return Object.values((getFromRawJSON('summoner') as SummonerJSON).data).map((el) => ({
      id: el.id,
      name: el.name,
   }));
};

export default genSummonerSpells;
