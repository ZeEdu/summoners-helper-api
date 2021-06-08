import fs from 'fs';
import path from 'path';
import { Spells } from '../../interfaces/Guide';
import { SummonerJSON } from '../../interfaces/SummonerJSON';
import getFromRawJSON from '../getFromRawJSON';

export const genSpells = (spells: Spells) => {
   try {
      const parsedSummoner = getFromRawJSON('summoner') as SummonerJSON;
      return {
         first: {
            name: parsedSummoner.data[spells.first].name,
            image: parsedSummoner.data[spells.first].image.full,
            description: parsedSummoner.data[spells.first].description,
         },
         second: {
            name: parsedSummoner.data[spells.second].name,
            image: parsedSummoner.data[spells.second].image.full,
            description: parsedSummoner.data[spells.second].description,
         },
      };
   } catch (error) {
      console.error('Error occurred:', error);
      throw new Error(error);
   }
};
