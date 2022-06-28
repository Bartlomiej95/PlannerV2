export interface ProjectI {
    id: string,
    title: string,
    customer: string,
    deadline: Date,
    duration: number,
    projectValue: number,
    description: string,
    scopeOfWork: string,
    isFinished: boolean,
    tasks: [string],
}