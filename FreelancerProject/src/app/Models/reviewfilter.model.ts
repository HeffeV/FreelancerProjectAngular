import { Skill } from './skill.model';
import { Tag } from './tag.model';

export class FilterReviewModel {
    constructor(
        public title: string,
        public company: string,
        public username: string,
        public userReview: boolean
    ) { }
}
