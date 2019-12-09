import { UserCompany } from './user-company.model';
import { Review } from './review.model';
import { Assignment } from './assignment.model';
import { ContactInfo } from './contact-info.model';

export class Company {
    constructor(
    public CompanyID:number,
    public UserCompanies:UserCompany[],
    public Reviews:Review[],
    public Assignments:Assignment[],
    public Location:Location,
    public CompanyName:string,
    public ContactInfo:ContactInfo,
    public About:string
    ){}
}
