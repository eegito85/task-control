using Microsoft.EntityFrameworkCore;
using TaskControlApp.Domain.Entities;
using TaskControlApp.Domain.Interfaces;
using TaskControlApp.Infra.Data.Context;

namespace TaskControlApp.Infra.Data.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TaskItem> CreateTaskAsync(TaskItem task)
        {
            _context.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<IEnumerable<TaskItem>> GetAllTasksAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<TaskItem> GetTaskByIdAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return new TaskItem();
            return task;
        }

        public async Task<TaskItem> RemoveTaskAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return new TaskItem();
            _context.Remove(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TaskItem> UpdateTaskAsync(TaskItem task)
        {
            _context.Update(task);
            await _context.SaveChangesAsync();
            return task;
        }
    }
}
