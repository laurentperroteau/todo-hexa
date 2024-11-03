import { User } from '../../../domain/user.model';

export class UserEntity {
  id: string;
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.fullName;
  }

  static toDomain(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      fullName: userEntity.name,
    };
  }
}
