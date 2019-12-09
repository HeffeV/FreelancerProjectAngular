import { Category } from './category.model';

export class Skill {
    constructor(
        public skillID:number,
        public skillName:string,
        public category:Category
    ){

    }
}
