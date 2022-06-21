export interface TaskI {
    id: string,
    title: string,
    brief: string,
    guidelines: string,
    timeForTheTask: number,
    categoryTask: string,
    isFinish: boolean,
    isActive: boolean,
    userId?: string,
}