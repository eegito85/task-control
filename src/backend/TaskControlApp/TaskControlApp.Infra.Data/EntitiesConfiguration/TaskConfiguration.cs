using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskControlApp.Domain.Entities;

namespace TaskControlApp.Infra.Data.EntitiesConfiguration
{
    public class TaskConfiguration : IEntityTypeConfiguration<TaskItem>
    {
        public void Configure(EntityTypeBuilder<TaskItem> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(p => p.Name).HasMaxLength(200).IsRequired();
            builder.Property(p => p.Created).IsRequired();
            builder.Property(p => p.Priority).IsRequired();
        }
    }
}
