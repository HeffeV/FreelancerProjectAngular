import { User } from './user.model';
import { Tag } from './tag.model';
import { Company } from './company.model';

export class TagCompany {
    constructor(
        public tagCompanyID:number,
        public company:Company,
        public tag:Tag
    ){}
}
