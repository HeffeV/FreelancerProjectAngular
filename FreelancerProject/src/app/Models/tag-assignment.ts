import { User } from './user.model';
import { Tag } from './tag.model';
import { Assignment } from './assignment.model';

export class TagAssignment {
    constructor(
        public tagAssignmentID:number,
        public assignment:Assignment,
        public tag:Tag
    ){}
}
