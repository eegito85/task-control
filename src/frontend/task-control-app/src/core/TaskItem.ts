export default class TaskItem {
    id: number
    name: string
    description: string
    created: string
    updated: string
    priority: number

    constructor(id: number = 0 ,name: string = '', description: string = '', created: string, updated: string, priority: number = 0) {
        this.id = id
        this.name = name
        this.description = description
        this.created = created
        this.updated = updated
        this.priority = priority
    }
}