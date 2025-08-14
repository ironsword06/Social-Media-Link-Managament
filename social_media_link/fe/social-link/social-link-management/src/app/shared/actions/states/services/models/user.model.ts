export interface User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    role_id: number;
  }
  

  export interface SignupRequest {
    email: string;
    username: string;
    password: string;
  }

  export interface SignupResponse {
    message: string;
    user?: User; 
  }

  export interface Username {
    username: string;
  }

  export interface UpdateUserRequest {
    username: string;
    email: string;
  }