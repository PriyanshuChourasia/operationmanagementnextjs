import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project{
    data:[{
        id: number;
        name: string;
        description?: string;
        startDate?: string;
        endDate?: string;
    }]
    success:boolean
}

export interface User{
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}

export interface Attachment{
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}

export enum Priority{
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog"
}

export enum Status{
    ToDo="To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed"
}


export interface Task{
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: string;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export interface TaskDetail{
    data:Task[]
    success:boolean
}


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
    }),
    reducerPath: "api",
    tagTypes: ["Projects","Tasks"],
    endpoints: (builder) => ({
        getProjects: builder.query<Project, void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),
        createProject: builder.mutation<Project, Partial<Project>>({
            query:(project)=>({
                url:"projects",
                method:"POST",
                body: project
            }),
            invalidatesTags: ["Projects"]
        }),
        getTasks: builder.query<TaskDetail, {projectId: number}>({
            query: ({projectId}) => `tasks?projectId=${projectId}`,
            providesTags: (result) => result ? result.data.map(({id}) => ({type: "Tasks" as const, id})) : [{type: "Tasks" as const}],
        }),
        createTasks: builder.mutation<Task, Partial<Task>>({
            query:(task)=>({
                url:"tasks",
                method:"POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTasks: builder.mutation<Task, {taskId: number; status: string}>({
            query:({taskId,status})=>({
                url:`tasks/${taskId}`,
                method:"PATCH",
                body: {status}
            }),
            invalidatesTags: (result,error,{taskId}) => [
                {type: "Tasks",id: taskId},
            ]
        }),
    }),
})

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTasksMutation,
    useUpdateTasksMutation} = api;