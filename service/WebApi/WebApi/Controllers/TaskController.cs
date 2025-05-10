using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Create(TaskDto.Create request)
        {           
            return Ok(await _taskService.Create(request, 1));
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _taskService.GetAll());
        }
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _taskService.GetById(id));
        }
        [HttpPut("[action]")]
        public async Task<IActionResult> Update(TaskDto.Update request)
        {
            return Ok(await _taskService.Update(request));
        }
        [HttpDelete("[action]/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _taskService.Delete(id));
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetSelectList()
        {
            return Ok(await _taskService.GetSelectList());
        }
    }
}
