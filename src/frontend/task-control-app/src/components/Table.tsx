"use client"

import TaskItem from "@/core/TaskItem"
import { EditIcon, TrashIcon} from "./Icons"

interface TableProps {
    tasks: TaskItem[]
    selectedTask?: (task: TaskItem) => void
    deletedTask?: (task: TaskItem) => void
}

export default function Table(props: TableProps) {

    function renderHeaderTable() {
        return (
            <tr>
                <th className="text-center p-2">Nome</th>
                <th className="text-center p-2">Observação</th>
                <th className="text-center p-2">Prioridade</th>
                <th className="text-center p-2">Criado em</th>
                <th className="text-center p-2">Atualizado em</th>
                <th className="text-center p-2">Ações</th>
            </tr>
        )
    }

    function getPriorityType(priority: number) {
        switch (priority) {
            case 0:
                return 'Baixa';
            case 1:
                return 'Média';
            default:
                return 'Alta';
        }
    }

    function renderActions(task: TaskItem) {
        return (
            <td className="flex" >
                <button className={`
                    flex justify-center items-center
                    bg-transparent
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-100
                `} onClick={() => props.selectedTask?.(task)} >
                    {EditIcon}
                </button>
                <button className={`
                    flex justify-center items-center
                    bg-transparent
                    text-red-600 rounded-full p-2 m-1
                    hover:bg-purple-100
                `} onClick={() => props.deletedTask?.(task)} >
                    {TrashIcon}
                </button>
            </td>
        )
    }

    function renderDataTable() {
        return props.tasks?.map((task, i) => {
            return (
                <tr key={task.id} 
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-50' }`}>
                    <td className="text-sm text-left p-2" >{task.name}</td>
                    <td className="text-sm text-left p-2" >{task.description}</td>
                    <td className="text-sm text-center p-2" >{getPriorityType(task.priority)}</td>
                    <td className="text-sm text-center p-2" >{task.created.toISOString()}</td>
                    <td className="text-sm text-center p-2" >{task.updated.toISOString()}</td>
                    {renderActions(task)}
                </tr>
            )
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden" >
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderHeaderTable()}
            </thead>
            <tbody>
                {renderDataTable()}
            </tbody>
        </table>
    )
}