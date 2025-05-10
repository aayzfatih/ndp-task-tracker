using System.Text.Json.Serialization;

namespace WebApi.Dtos
{
    public class GeneralDto
    {
        public class Response
        {
            public bool Error { get; set; } = false;
            public string Message { get; set; }
            [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
            public object Data { get; set; }
            [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
            public object Common { get; set; }

            public Response()
            {

            }
            public Response(bool isError = false)
            {
                if (isError == true)
                {
                    Error = true;
                    Message = "An error was occured!";
                }
            }

            public Response(bool isError, string message, object? data = null)
            {
                Error = isError;
                Message = message;

                if (data is not null)
                    Data = data;
            }
        }

        public class Response<T>
        {
            public bool Error { get; set; } = false;
            public string Message { get; set; }
            public T Data { get; set; }
            [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
            public object Common { get; set; }

            public Response()
            {

            }
            public Response(bool isError = false)
            {
                if (isError == true)
                {
                    Error = true;
                    Message = "An error was occured!";
                }
            }

            public Response(bool isError, string message, T? data = default(T))
            {
                Error = isError;
                Message = message;
                if (data is not null && !data.Equals(default(T)))
                    Data = data;
            }
        }

        public class Select
        {
            public string Label { get; set; }
            public object Value { get; set; }
            [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
            public object Common { get; set; }
        }

        public class IdRequest
        {
            public int Id { get; set; }
        }
        public class StringRequest
        {
            public string Value { get; set; }
        }
    }
}
