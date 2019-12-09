import { Tag } from './tag.model';
import { Company } from './company.model';
import { User } from './user.model';
import { UserAssignment } from './user-assignment.model';
import { Status } from './status.model';

export class Assignment {
    constructor(
        public assignmentID:number,
        public tags:Tag[],
        public description:string,
        public assignmentName:string,
        public location:Location,
        public company:Company,
        public userAssignments:UserAssignment[],
        public status:Status
    ){

    }
}
