import { UpdateUserRequest } from "../../actions/states/services/models/user.model";

export class Signup {
  static readonly type = '[User] Signup';
  constructor(public payload: { email: string; username: string; password: string }) {}
}

export class SetIsAuthenticated {
  static readonly type = '[User] Set Is Authenticated';
  constructor(public payload: boolean) {}
}

export class GetUserInfo {
  static readonly type = '[User] Get User Info';
  constructor(public userId: number) {}
}

export class UpdateUserInfo {
  static readonly type = '[User] Update User Info';
  constructor(public payload: { username: string; email: string; password: string }) {}
}

export class AdminUpdateUser {
  static readonly type = '[User] Admin Update User';
  constructor(public userId: number, public payload: UpdateUserRequest) {}
}

export class AdminDeactivateUser {
  static readonly type = '[User] Admin Deactivate User';
  constructor(public userId: number) {}
}