using Microsoft.EntityFrameworkCore;
using WebApi.Dtos;
using WebApi.Entities.TaskTracker;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<GeneralDto.Response> Save(UserDto.Save request);
        Task<GeneralDto.Response> GetAll();
        Task<GeneralDto.Response> GetUserById(int id);
        Task<GeneralDto.Response> Update(UserDto.Update request);
        Task<GeneralDto.Response> Delete(int id);

    }
    public class UserService : IUserService
    {
        private readonly TaskTrackerDbContext _context;

        public UserService(TaskTrackerDbContext context)
        {
            _context = context;
        }

        public async Task<GeneralDto.Response> Delete(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(f => f.Id == id);
            if (user == null)
                return new GeneralDto.Response(true, "User not found!");

            _context.Users.Remove(user);
            _ = _context.SaveChangesAsync();
            return new GeneralDto.Response(false, "User deleted successfully!");
        }

        public async Task<GeneralDto.Response> GetAll()
        {
            var userList = await _context.Users.Select(s => new UserDto.List
            {
                Id = s.Id,
                Name = s.Name,
                Surname = s.Surname,
                Email = s.Email,
                Phone = s.Phone
            }).ToListAsync();
            return new GeneralDto.Response(false, "User list retrieved successfully!", userList);
        }



        public async Task<GeneralDto.Response> GetUserById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(f => f.Id == id);
            if (user == null)
                return new GeneralDto.Response(true, "User not found!");
            var userDto = new UserDto.List
            {
                Id = user.Id,
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                Phone = user.Phone

            };
            return new GeneralDto.Response(false, "User retrieved successfully!", userDto);
        }

        public async Task<GeneralDto.Response> Save(UserDto.Save request)
        {
            try
            {
                var user = new User
                {
                    Name = request.Name,
                    Surname = request.Surname,
                    Email = request.Email,
                    Phone = request.Phone,
                };
                _ = _context.Users.AddAsync(user);
                _ = _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new GeneralDto.Response(true, "Bir hata meydana geldi");
            }

            return new GeneralDto.Response(false, "User saved successfully!");
        }

        public async Task<GeneralDto.Response> Update(UserDto.Update request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(f => f.Id == request.UserId);
            if (user == null)
                return new GeneralDto.Response(true, "User not found!");

            user.Name = request.Name;
            user.Surname = request.Surname;
            user.Email = request.Email;

            _ = await _context.SaveChangesAsync();

            return new GeneralDto.Response(false, "User updated successfully!");
        }
    }
}
