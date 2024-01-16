using Microsoft.AspNetCore.Mvc;
using TaskControlApp.Application.DTOs;
using TaskControlApp.Application.Interfaces;

namespace TaskControlApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskItemService _taskService;

        public TaskController(ITaskItemService taskService)
        {
            _taskService = taskService;
        }

        /// <summary>
        /// Endpoint que retorna os dados de todos as tarefas
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetTasks")]
        public async Task<ActionResult<TaskItemDto>> GetTasks()
        {
            var tasks = await _taskService.GetAllTasks();
            if (tasks.Count() == 0)
            {
                return NotFound("Não foi possível retornar os dados das tarefas");
            }

            return Ok(tasks);
        }

        /// <summary>
        /// Endpoint para retornar a informação completa de uma tarefa
        /// </summary>
        /// <param name="id">Id do cliente</param>
        /// <returns></returns>
        [HttpGet("GetTask/{id}")]
        public async Task<ActionResult<TaskItemDto>> GetTaskById(int id)
        {
            var task = await _taskService.GetTaskById(id);
            if (task == null)
            {
                return NotFound("Não foi possível retornar os dados do cliente");
            }
            
            return Ok(task);
        }

        /// <summary>
        /// Endpoint para cadastrar na base de dados as informações de uma tarefa
        /// </summary>
        /// <param name="taskItemDto"></param>
        /// <returns></returns>
        [HttpPost("CreateCustomer")]
        public async Task<ActionResult> Post([FromBody] TaskItemDto taskItemDto)
        {
            if (taskItemDto == null)
                return BadRequest("Data Invalid");

            await _taskService.CreateTask(taskItemDto);

            return Ok(taskItemDto);
        }

        /// <summary>
        /// Endpoint para atualizar os dados de uma tarefa
        /// </summary>
        /// <param name="id"></param>
        /// <param name="taskItemDto"></param>
        /// <returns></returns>
        [HttpPut("UpdateTask/{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] TaskItemDto taskItemDto)
        {
            if (id != taskItemDto.Id)
            {
                return BadRequest("Dado invalido");
            }

            if (taskItemDto == null)
                return BadRequest("Dado invalido");

            await _taskService.UpdateTask(taskItemDto);
            
            return Ok(taskItemDto);
        }

        /// <summary>
        /// Endpoint para apagar o registro de uma tarefa na base de dados
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<ActionResult<TaskItemDto>> Delete(int id)
        {
            var taskItemDto = await _taskService.GetTaskById(id);

            if (taskItemDto == null)
            {
                return NotFound("Tarefa não encontrado");
            }

            await _taskService.RemoveCustomer(id);
            
            return Ok(taskItemDto);
        }
    }
}
