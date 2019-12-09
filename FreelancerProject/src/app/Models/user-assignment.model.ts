import { User } from './user.model';
import { Assignment } from './assignment.model';

export class UserAssignment {
    constructor(
        public userAssignmentID:number,
        public user:User,
        public assignment:Assignment,
        public accepted:Boolean
    ){

    }
}
