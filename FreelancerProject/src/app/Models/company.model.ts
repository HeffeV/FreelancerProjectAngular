import { UserCompany } from './user-company.model';
import { Review } from './review.model';
import { Assignment } from './assignment.model';
import { ContactInfo } from './contact-info.model';
import { Tag } from './tag.model';
import { TagCompany } from './tag-company';

export class Company {
    constructor(
    public companyID:number,
    public userCompanies:UserCompany[],
    public reviews:Review[],
    public assignments:Assignment[],
    public tagCompanies: TagCompany[],
    public location:Location,
    public companyName:string,
    public contactInfo:ContactInfo,
    public about:string
    ) {}
}
