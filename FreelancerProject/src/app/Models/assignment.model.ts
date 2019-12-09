import { Tag } from './tag.model';
import { Company } from './company.model';
import { User } from './user.model';

export class Assignment {
    constructor(
        public AssignmentID:number,
        public Tags:Tag[],
        public Description:string,
        public AssignmentName:string,
        public Location:Location,
        public Company:Company,
        public User:User
    ){

    }
}
