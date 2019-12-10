import { User } from './user.model';
import { Tag } from './tag.model';

export class TagUser {
    constructor(
        public tagUserID:number,
        public user:User,
        public tag:Tag
    ){}
}
