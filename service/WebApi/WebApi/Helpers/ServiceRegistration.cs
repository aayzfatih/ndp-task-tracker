using Microsoft.OpenApi.Models;
using WebApi.Entities.TaskTracker;
using WebApi.Models.Configuration;

namespace WebApi.Helpers
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Task Tracker",
                    Description = "Task Tracker Service",
                });
            });

            return services;
        }
        public static IServiceCollection AddCustomServices(this IServiceCollection services, AppSettings appSettings)
        {
            services.AddDbContext<TaskTrackerDbContext>();
         

            return services;
        }
    }
}
