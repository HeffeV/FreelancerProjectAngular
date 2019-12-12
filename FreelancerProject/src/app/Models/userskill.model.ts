import { Category } from './category.model';
import { User } from './user.model';
import { Skill } from './skill.model';

export class UserSkill {
    constructor(
        public userSkillID: number,
        public user: User,
        public skill: Skill
    ) {

    }
}
