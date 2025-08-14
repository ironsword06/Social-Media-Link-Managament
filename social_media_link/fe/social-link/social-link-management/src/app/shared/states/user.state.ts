import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AdminDeactivateUser, AdminUpdateUser, GetUserInfo, SetIsAuthenticated, Signup, UpdateUserInfo } from './actions/user.actions';
import { UserService } from '../actions/states/services/user.service';
import {
  SignupRequest,
  SignupResponse,
  User,
  Username,
} from '../actions/states/services/models/user.model';
import { tap } from 'rxjs/operators';


export interface UserStateModel {
  user: User | null;
  username: Username | null;
  error: string | null;
  isAuthenticated: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    username: null,
    error: null,
    isAuthenticated: false,
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static getUser(state: UserStateModel): User | null {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: UserStateModel): boolean {
    return state.isAuthenticated;
  }

  @Action(AdminUpdateUser)
  adminUpdateUser(ctx: StateContext<UserStateModel>, action: AdminUpdateUser) {
    const { userId, payload } = action;
    
    return this.userService.adminUpdateUser(userId, payload).pipe(
      tap({
        next: (response) => {
          ctx.patchState({
            user: response,
            error: null
          });
        },
        error: (error) => {
          ctx.patchState({
            error: error.message,
          });
        }
      })
    );
  }

  @Action(AdminDeactivateUser)
  adminDeactivateUser(ctx: StateContext<UserStateModel>, action: AdminDeactivateUser) {
    const state = ctx.getState();
    return this.userService.deactivateUser(action.userId).pipe(
      tap({
        next: () => {
          ctx.patchState({
            user: null,
            error: null
          });
        },
        error: (error) => {
          ctx.patchState({
            error: error.message
          });
        }
      })
    );
  }

@Action(GetUserInfo)
getUserInfo(ctx: StateContext<UserStateModel>, action: GetUserInfo) {
  return this.userService.getUserInfo(action.userId).pipe(
    tap(user => {
      ctx.patchState({
        user,
        error: null
      });
    }, error => {
      ctx.patchState({
        user: null,
        error: 'Failed to fetch user info'
      });
    })
  );
}

@Action(UpdateUserInfo)
updateUserInfo(ctx: StateContext<UserStateModel>, action: UpdateUserInfo) {
  const { username, email, password } = action.payload;

  return this.userService.updateUser({username, email, password}).pipe(
    tap({
      next: (response) => {
        ctx.patchState({
          user: response,
          error: null
        });
      },
      error: (error) => {
        ctx.patchState({
          error: error.message,
        });
      }
    })
  );
}

  @Action(SetIsAuthenticated)
  setIsAuthenticated(
    ctx: StateContext<UserStateModel>,
    action: SetIsAuthenticated
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      isAuthenticated: action.payload,
    });
  }

  @Action(Signup)
  signup(ctx: StateContext<UserStateModel>, action: Signup) {
    const { email, username, password } = action.payload;
    const request: SignupRequest = { email, username, password };

    this.userService.signup(request).subscribe(
      (response: SignupResponse) => {
        if (response.user) {
          ctx.patchState({ user: response.user, error: null });
        }
      },
      (error) => {
        console.error('Signup failed:', error);
        ctx.patchState({ error: 'Signup failed. Please try again later.' });
      }
    );
  }
}
