"use client"

import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout'
import TaskItem from '@/core/TaskItem'
import { EditIcon, TrashIcon, PlusIcon} from "../components/Icons"

export default function Home() {

  const tasks = [
    new TaskItem(1,'Limpar a casa na sexta feira', 'Comprar pano de chão antes da limpeza', new Date("2022-01-01T12:00:00Z"), new Date("2022-01-01T12:00:00Z"),  1),
    new TaskItem(2,'Trocar água do cachorro', 'Limpar pote de água', new Date("2022-01-01T12:00:00Z"), new Date("2022-01-01T12:00:00Z"),  2),
    new TaskItem(3,'Devolver notebook na próxima semana', 'Endereço: Rua Exemplo, sem número, casa 45', new Date("2022-01-01T12:00:00Z"), new Date("2022-01-01T12:00:00Z"),  0)
  ]

  const router = useRouter();

  function deleteTask(task: TaskItem) {
    console.log(task.id);
  }

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
            `} 
            onClick={() => router.push(`/task/update?id=${task.id}`)} 
            >
                {EditIcon}
            </button>
            <button className={`
                flex justify-center items-center
                bg-transparent
                text-red-600 rounded-full p-2 m-1
                hover:bg-purple-100
            `} 
            onClick={() => deleteTask(task)}
            >
                {TrashIcon}
            </button>
        </td>
    )
}

function renderDataTable() {
    return tasks?.map((task, i) => {
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
    <div className={`
    flex h-screen justify-center items-center
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white `} >
      <Layout titulo='Lista tarefas' >
        <div className='flex flex-row p-2'>
            <button className={`
                flex flex-row justify-center items-center
                bg-green-600 text-white 
                rounded-md w-60 h-10
                `} 
                onClick={() => router.push('/task/create')} >
                {PlusIcon} Nova tarefa
            </button>                
        </div>
        <br />
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
      </Layout>
    </div>
  )
}
