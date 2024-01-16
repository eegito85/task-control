using TaskControlApp.Application.DTOs;

namespace TaskControlApp.Application.Interfaces
{
    public interface ITaskItemService
    {
        Task<IEnumerable<TaskItemDto>> GetAllTasks();
        Task<TaskItemDto> GetTaskById(int id);
        Task<TaskItemDto> CreateTask(TaskItemDto task);
        Task<TaskItemDto> UpdateTask(TaskItemDto task);
        Task RemoveCustomer(int id);
    }
}
