import { Tag } from './tag.model';
import { Company } from './company.model';
import { User } from './user.model';

export class Assignment {
    constructor(
        public assignmentID:number,
        public tags:Tag[],
        public description:string,
        public assignmentName:string,
        public location:Location,
        public company:Company,
        public user:User
    ){

    }
}
