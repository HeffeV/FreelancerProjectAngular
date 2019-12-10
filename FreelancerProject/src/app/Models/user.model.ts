import { ContactInfo } from './contact-info.model';
import { UserCompany } from './user-company.model';
import { Assignment } from './assignment.model';
import { Skill } from './skill.model';
import { Review } from './review.model';
import { Tag } from './tag.model';
import { UserType } from './user-type.model';
import { Location } from './location.model';
import { UserAssignment } from './user-assignment.model';
import { TagUser } from './tag-user';

export class User {
    constructor(
        public userID:number,
        public email:string,
        public password:string,
        public username:string,
        public name:string,
        public lastName:string,
        public bio:string,
        public birthYear:number,
        public token:string,

        public userType:UserType,
        public skills:Skill[],
        public reviews:Review[],
        public contactInfo:ContactInfo,
        public userCompanies:UserCompany[],
        public tagUsers:TagUser[],
        public userAssignments:UserAssignment[],
        public location:Location
    ){}
}
