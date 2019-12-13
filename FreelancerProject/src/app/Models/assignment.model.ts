import { Tag } from './tag.model';
import { Company } from './company.model';
import { User } from './user.model';
import { UserAssignment } from './user-assignment.model';
import { Status } from './status.model';
import { TagAssignment } from './tag-assignment';
import { Location } from 'src/app/Models/location.model';

export class Assignment {
    constructor(
        public assignmentID: number,
        public tagAssignments: TagAssignment[],
        public description: string,
        public assignmentName: string,
        public location: Location,
        public company: Company,
        public userAssignments: UserAssignment[],
        public status: Status,
        public image: string
    ) {

    }
}
