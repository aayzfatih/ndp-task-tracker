using Microsoft.EntityFrameworkCore;
using WebApi.Dtos;
using WebApi.Entities.TaskTracker;

namespace WebApi.Services
{
    public interface ITaskService
    {
        Task<GeneralDto.Response> Create(TaskDto.Create request, int creatorUserId);
        Task<GeneralDto.Response> GetAll();
        Task<GeneralDto.Response> GetById(int id);
        Task<GeneralDto.Response> Update(TaskDto.Update request);
        Task<GeneralDto.Response> Delete(int id);
        Task<GeneralDto.Response> GetSelectList();
    }
    public class TaskService : ITaskService
    {
        private readonly TaskTrackerDbContext _context;
        public TaskService(TaskTrackerDbContext dbContext)
        {
            _context = dbContext;
        }
        public async Task<GeneralDto.Response> Create(TaskDto.Create request, int creatorUserId)
        {

            Entities.TaskTracker.Task task = new Entities.TaskTracker.Task
            {
                Title = request.TaskTitle,
                Description = request.Description,
                AssignedUserId = request.AssignedUserId,
                StateId = request.TaskStateId,
                PriortyId = request.PriorityId,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                CreationDate = DateTime.Now,
                CreatorUserId = creatorUserId,
                Status = true
            };

            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();

            return new GeneralDto.Response(false, "Görev başarıyla eklendi");
        }

        public async Task<GeneralDto.Response> Delete(int id)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(f => f.Id == id && f.Status);
            if (task == null)
                return new GeneralDto.Response(true, "Task not found!");
            task.Status = false;
            _ = await _context.SaveChangesAsync();
            return new GeneralDto.Response(false, "Task deleted successfully!");
        }

        public async Task<GeneralDto.Response> GetAll()
        {
            var taskList = await _context.Tasks
                .Where(w => w.Status)
                .Select(s => new TaskDto.List
                {
                    Id = s.Id,
                    TaskTitle = s.Title,
                    Description = s.Description,
                    Status = s.Status,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    AssignedUserName = s.AssignedUser.Name + " " + s.AssignedUser.Surname,
                    CreatorUserName = s.CreatorUser.Name + " " + s.CreatorUser.Surname,
                    TaskStateName = s.State.Name,
                    PriorityName = s.Priorty.Name,
                    CreationDate = s.CreationDate,
                    PriorityId = s.PriortyId,
                    TaskStateId = s.StateId

                }).ToListAsync();
            var TaskList = await _context.Tasks.ToListAsync();

            return new GeneralDto.Response(false, "Task list retrieved successfully!", taskList);
        }
        public async Task<GeneralDto.Response> GetSelectList()
        {
            UserDto.SelectList selectList = new UserDto.SelectList();
            selectList.SelectUserList = await _context.Users.Select(s => new GeneralDto.Select
            {
                Label = s.Name + " " + s.Surname,
                Value = s.Id
            }).ToListAsync();

            selectList.StateList = await _context.TaskStates.Select(s => new GeneralDto.Select
            {
                Label = s.Name,
                Value = s.Id
            }).ToListAsync();
            selectList.PriorityList = await _context.Priorities.Select(s => new GeneralDto.Select
            {
                Label = s.Name,
                Value = s.Id
            }).ToListAsync();

            return new GeneralDto.Response(false, null, selectList);
        }
        public async Task<GeneralDto.Response> GetById(int id)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(f => f.Id == id && f.Status);

            if (task == null)
                return new GeneralDto.Response(true, "Task not found!");

            TaskDto.Detail detail = new TaskDto.Detail
            {
                TaskTitle = task.Title,
                Description = task.Description,
                AssignedUserId = task.AssignedUserId,
                TaskStateId = task.StateId,
                PriorityId = task.PriortyId,
                StartDate = task.StartDate,
                EndDate = task.EndDate
            };


            return new GeneralDto.Response(false, null, detail);
        }
        public async Task<GeneralDto.Response> Update(TaskDto.Update request)
        {
            var task = await _context.Tasks
               .FirstOrDefaultAsync(f => f.Id == request.TaskId && f.Status);

            if (task == null)
                return new GeneralDto.Response(true, "Task not found!");

            task.StateId = request.TaskStateId;
            task.PriortyId = request.PriorityId;
            task.UpdateDate = DateTime.Now;
            task.UpdatorUserId = 1;


            await _context.SaveChangesAsync();

            return new GeneralDto.Response(false, null, "Task has been updated");
        }
    }

}
