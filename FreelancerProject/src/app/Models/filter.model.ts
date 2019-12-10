import { Skill } from './skill.model';
import { Tag } from './tag.model';

export class FilterModel {
    constructor(
        public title:string,
        public tags:Tag[],
        public skills:Skill[],
        public companyName:string,
        public description:string
    ){}
}
