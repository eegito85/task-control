namespace TaskControlApp.Application.DTOs
{
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Created { get; set; }
        public string Updated { get; set; }
        public int Priority { get; set; }
    }
}
