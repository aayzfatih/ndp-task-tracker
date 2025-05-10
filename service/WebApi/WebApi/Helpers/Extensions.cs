using System.Security.Claims;

namespace WebApi.Helpers
{
    public static class Extensions
    {
      
        public static int ToInt(this string value)
        {
            return (string.IsNullOrEmpty(value) ? 0 : Convert.ToInt32(value));
        }
    }
}
