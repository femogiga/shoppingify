


export interface Project {
    id: number;
    projectColumns: ProjectColumn[];
    status: string;
    title: string;
}


export interface ProjectColumn {
    id: number;
    name: string;
    project_id: number;
    tasks: Task[];
}


export interface Task {
    id: number;
    title: string;
    description: string;
    subTasks: SubTask[];
    status: string;
    taskMembers: User[];
}

export interface SubTask {
    id: number;
    title: string;
    description: string;
    task_id: number;
    status: string;
    subTaskMembers: User[];
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string
    photoUrl: string;

}


//derived types

export type Credentials = Pick<User, "email" | "password">
export type RegisterType = Omit<User, "id">
export type CreateColumnType = Pick<ProjectColumn, "project_id" | "name">


type ProjectColumnNameType = Pick<ProjectColumn, "name">;
type ProjectTitleType = Pick<Project, "title">;

export type CreateProjectType = ProjectTitleType & {
    projectColumns: ProjectColumnNameType[];
};


export type CreateTaskType = Pick<Task, "title" | "description" | "status"> &
    Pick<ProjectColumn ,"project_id">


export type CreateUserType = Pick<User, "firstname" | "lastname" | "email" | "password"> & {
    photo:File
}
