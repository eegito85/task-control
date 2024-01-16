using AutoMapper;
using TaskControlApp.Application.DTOs;
using TaskControlApp.Application.Interfaces;
using TaskControlApp.Domain.Entities;
using TaskControlApp.Domain.Interfaces;

namespace TaskControlApp.Application.Services
{
    public class TaskItemService : ITaskItemService
    {
        private ITaskRepository _taskRepository;
        private IMapper _mapper;

        public TaskItemService(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        public async Task<TaskItemDto> CreateTask(TaskItemDto task)
        {
            var taskItemEntity = _mapper.Map<TaskItem>(task);
            taskItemEntity = await _taskRepository.CreateTaskAsync(taskItemEntity);
            return _mapper.Map<TaskItemDto>(taskItemEntity);
        }

        public async Task<IEnumerable<TaskItemDto>> GetAllTasks()
        {
            var tasksEntity = await _taskRepository.GetAllTasksAsync();
            return _mapper.Map<IEnumerable<TaskItemDto>>(tasksEntity);
        }

        public async Task<TaskItemDto> GetTaskById(int id)
        {
            var taskItemEntity = await _taskRepository.GetTaskByIdAsync(id);
            return _mapper.Map<TaskItemDto>(taskItemEntity);
        }

        public async Task RemoveCustomer(int id)
        {
            await _taskRepository.RemoveTaskAsync(id);
        }

        public async Task<TaskItemDto> UpdateTask(TaskItemDto task)
        {
            var taskItemEntity = _mapper.Map<TaskItem>(task);
            taskItemEntity = await _taskRepository.UpdateTaskAsync(taskItemEntity);
            return _mapper.Map<TaskItemDto>(taskItemEntity);
        }
    }
}
