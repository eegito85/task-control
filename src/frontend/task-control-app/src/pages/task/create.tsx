import '../../styles/globals.css';
import Swal from 'sweetalert2';
import Layout from "@/components/Layout";
import TaskItem from '@/core/TaskItem';
import React from 'react';
import axios from 'axios';
import { BackIcon, SaveIcon} from "../../components/Icons";
import { useRouter } from "next/router";
import { useState } from 'react';

export default function CreateTask() {
   
    const router = useRouter();
    const id_task = router.query.id;

    //console.log('Id: ', id_task);

    // Estado local para armazenar os dados do formulário
    const [dadosFormulario, setDadosFormulario] = useState<TaskItem>({
        id: 0,
        name: '',
        description: '',
        created: '',
        updated: '',
        priority: 0
    }
    );

    // Manipulador de alterações nos campos do formulário
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setDadosFormulario({ ...dadosFormulario, [name]: value });
    };

    // Manipulador de envio do formulário
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Lógica para enviar dados do formulário (pode ser uma chamada de API, etc.)
        console.log('Dados do formulário enviados:', dadosFormulario);
    };

    // Estado local para armazenar o valor selecionado na lista suspensa
    const [selectedValue, setSelectedValue] = useState('');

    // Manipulador de alterações na lista suspensa
    const handleSelectChange = (event: any) => {
        const { value } = event.target;
        setSelectedValue(value);
        //console.log('var: ', dadosFormulario.priority);
        setDadosFormulario({ ...dadosFormulario, priority: value });
    };

    const baseURL = 'http://localhost:5146/api/Task/CreateTask';

    function saveTask() {

        axios.post(baseURL , dadosFormulario)
        .then((response) => {
            Swal.fire({
                html: `Tarefa adicionada com sucesso!`,
                width: '800',
                didClose: () => {
                    router.push('/');
                },
              });
        })
        .catch(() => {
            Swal.fire('Erro ao adicionar tarefa!');
        });
    }

    return (
        <div className={`
        flex h-screen justify-center items-center
        bg-gradient-to-r from-blue-500 to-purple-500
        text-black `}>
            <Layout titulo='Atualizar tarefa'>
                <form onSubmit={handleSubmit}
                    className="bg-gray-200">
                    <div className='flex flex-row p-4'>
                        <label className='pr-4 w-40' >Nome da tarefa:</label>
                        <input
                            className='flex flex-grow rounded-sm pl-2'
                            type="text"
                            name="name"
                            placeholder='Digite o  nome da tarefa...'
                            value={dadosFormulario?.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-row p-4'>
                        <label className='pr-4 w-40' >Descrição:</label>
                        <input
                            className='flex flex-grow rounded-sm pl-2'
                            type="text"
                            name="description"
                            placeholder='Digite  a descrição...'
                            value={dadosFormulario?.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-row p-4'>
                        <label className='pr-4 w-40' >Prioridade:</label>
                        <select id="dropdown" 
                            className='pl-2 w-40'
                            value={selectedValue} 
                            onChange={handleSelectChange}>
                                <option value="">Selecione...</option>
                                <option value="0">Baixa</option>
                                <option value="1">Média</option>
                                <option value="2">Alta</option>
                        </select>
                    </div>
                    <div className='flex flex-row p-4'>
                        <button className={`
                            flex flex-row justify-center items-center
                            bg-red-400 text-white 
                            rounded-md w-40 h-10
                            `} 
                            onClick={() => router.push('/')} >
                            {BackIcon} Voltar
                        </button>
                        <div className='w-10' ></div>
                        <button className={`
                            flex flex-row justify-center items-center
                            bg-green-600 text-white 
                            rounded-md w-40 h-10
                            `}
                            onClick={() => saveTask()}
                            type="submit">
                            {SaveIcon} Salvar
                        </button>
                    </div>
                </form>
            </Layout>
        </div>
    )
}