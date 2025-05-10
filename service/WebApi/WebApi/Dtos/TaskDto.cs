namespace WebApi.Dtos
{
    public static class TaskDto
    {
        public class Create
        {
            public string TaskTitle { get; set; }
            public string Description { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public int TaskStateId { get; set; }
            public int PriorityId { get; set; }
            public int AssignedUserId { get; set; }
        }
        public class List : Create
        {
            public int Id { get; set; }
            public string AssignedUserName { get; set; }
            public string CreatorUserName { get; set; }
            public string TaskStateName { get; set; }
            public string PriorityName { get; set; }
            public DateTime CreationDate { get; set; }
            public bool Status { get; set; }
        }
        public class Update : Create
        {
            public int TaskId { get; set; }

        }
        public class Detail : Create
        {
            public int UpdatorUserId { get; set; }
            public DateTime UpdateDate { get; set; }
        }
        public class SelectList
        {
            public List<GeneralDto.Select> SelectUserList { get; set; }
            public List<GeneralDto.Select> StateList { get; set; }
        }
    }
}
