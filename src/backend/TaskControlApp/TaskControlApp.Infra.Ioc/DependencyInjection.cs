using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskControlApp.Application.Interfaces;
using TaskControlApp.Application.Mappings;
using TaskControlApp.Application.Services;
using TaskControlApp.Domain.Interfaces;
using TaskControlApp.Infra.Data.Context;
using TaskControlApp.Infra.Data.Repositories;

namespace TaskControlApp.Infra.Ioc
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureApi(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("SqlConnection"),
            b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));


            services.AddScoped<ITaskRepository, TaskRepository>();
            
            services.AddAutoMapper(typeof(DomainToDtoMappingProfile));

            services.AddScoped<ITaskItemService, TaskItemService>();
            
            return services;
        }
    }
}
