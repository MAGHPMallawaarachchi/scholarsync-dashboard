export default interface Lecture {
    id?: string,
    moduleCode: string,
    lecturer: string,
    batch: string,
    degreeProgram: string,
    lectureHall: string,
    startTime: Date,
    endTime: Date,
    day: Date,
}