import { Skill } from './skill.model';
import { Tag } from './tag.model';

export class CompanyFilterModel {
    constructor(
        public country: string,
        public companyName: string,
        public postcode: string
    ) { }
}
