import { Skill } from './skill.model';
import { Tag } from './tag.model';

export class UserFilterModel {
    constructor(
        public username: string,
        public email: string,
        public userType: string
    ) { }
}
