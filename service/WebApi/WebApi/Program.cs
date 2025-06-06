using WebApi.Helpers;
using WebApi.Models.Configuration;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
AppSettings appSettings = builder.Configuration.GetSection("AppSettings").Get<AppSettings>();

services.AddCustomServices(appSettings);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(
                              "http://localhost:5173",
                              "http://10.34.60.105:5173"
                              )
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});
var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
