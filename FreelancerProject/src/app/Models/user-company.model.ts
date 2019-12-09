import { Company } from './company.model';
import { User } from './user.model';

export class UserCompany {
    constructor(
        public UserCompanyID:number,
        public Company:Company,
        public User:User
    ){}
}
