export type User = {
  id: string;
  fullName: string;
};

export class UserToCreate {
  fullName: string;

  constructor(user: UserToCreate) {
    this.fullName = user.fullName;
  }
}
