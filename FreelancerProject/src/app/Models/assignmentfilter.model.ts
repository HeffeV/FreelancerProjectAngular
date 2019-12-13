import { Skill } from './skill.model';
import { Tag } from './tag.model';

export class AssignmentFilterModel {
    constructor(
        public title: string,
        public companyName: string,
        public status: string
    ) { }
}
