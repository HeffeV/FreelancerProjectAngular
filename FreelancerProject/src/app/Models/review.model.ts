import { User } from './user.model';
import { Company } from './company.model';

export class Review {
    constructor(
        public ReviewID:number,
        public Score:number,
        public Description:string,
        public Title:string,
        public User:User,
        public Company:Company
    ){}
}
