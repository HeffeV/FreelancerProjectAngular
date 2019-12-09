import { Company } from './company.model';
import { User } from './user.model';

export class UserCompany {
    constructor(
        public userCompanyID:number,
        public company:Company,
        public user:User
    ){}
}
