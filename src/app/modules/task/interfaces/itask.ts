import { IUser } from '../../user/interfaces/iuser';

export interface ITask {
  projectID: number;
  detail: string;
  id?: number;
  status: string;
  assignedToUserID: number;
  createdOn?: string;
  assignedToUser?: IUser;
}
