namespace TaskControlApp.Application.DTOs
{
    public class TaskItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public int Priority { get; set; }
    }
}
