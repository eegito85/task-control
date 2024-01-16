using AutoMapper;
using TaskControlApp.Application.DTOs;
using TaskControlApp.Domain.Entities;

namespace TaskControlApp.Application.Mappings
{
    public class DomainToDtoMappingProfile : Profile
    {
        public DomainToDtoMappingProfile() 
        {
            CreateMap<TaskItem, TaskItemDto>().ReverseMap();
        }

    }
}
