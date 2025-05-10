namespace WebApi.Dtos
{
    public static class UserDto
    {
        public class Save
        {
            public string Name { get; set; }
            public string Surname { get; set; }

            private string _email;

            public string Email
            {
                get { return _email; }
                set
                {
                    if (IsValidEmail(value))
                    {
                        _email = value;
                    }
                    else
                    {
                        throw new ArgumentException("Invalid email address");
                    }
                }
            }
            public string Phone { get; set; }

            private bool IsValidEmail(string email)
            {
                return email.Contains("@");
            }
        }
        public class List : Save
        {
            public int Id { get; set; }

        }
        public class Update : Save
        {
            public int UserId { get; set; }
        }
        public class SelectList
        {
            public List<GeneralDto.Select> SelectUserList { get; set; }
            public List<GeneralDto.Select> StateList { get; set; }
            public List<GeneralDto.Select> PriorityList { get; set; }

        }
    }
}
