import { RunesReforged } from './RunesReforgedJSON';

export interface GuideFormStaticData {
   champions: Champion[];
   paths: RunesReforged[];
   spells: Spell[];
   items: Item[];
}

interface Champion {
   name: string;
   id: string;
}

interface Spell {
   id: string;
   name: string;
}

interface Item {
   id: string;
   name: string;
}
