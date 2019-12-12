import { User } from './user.model';
import { Company } from './company.model';

export class Review {


    constructor(
        public reviewID?: number,
        public score?:number,
        public description?:string,
        public title?:string,
        public user?:User,
        public company?:Company
    ){}
}
