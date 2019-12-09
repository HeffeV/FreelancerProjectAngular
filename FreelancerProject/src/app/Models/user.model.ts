import { ContactInfo } from './contact-info.model';
import { UserCompany } from './user-company.model';
import { Assignment } from './assignment.model';
import { Skill } from './skill.model';
import { Review } from './review.model';
import { Tag } from './tag.model';
import { UserType } from './user-type.model';
import { Location } from './location.model';

export class User {
    constructor(
        public UserID:number,
        public Email:string,
        public Password:string,
        public Username:string,
        public Name:string,
        public LastName:string,
        public Bio:string,
        public BirthYear:number,
        public Token:string,

        public UserType:UserType,
        public Skills:Skill[],
        public Reviews:Review[],
        public ContactInfo:ContactInfo,
        public UserCompanies:UserCompany[],
        public Tags:Tag[],
        public Assignments:Assignment[],
        public Location:Location
    ){}
}
