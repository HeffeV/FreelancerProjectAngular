import { Category } from './category.model';

export class Skill {
    constructor(
        public SkillID:number,
        public SkillName:string,
        public Category:Category
    ){

    }
}
