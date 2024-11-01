using api.Data;
using api.Enitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt=>
{opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddIdentityCore<User>().AddRoles<IdentityRole>().AddEntityFrameworkStores<StoreContext>();
builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
     app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}


app.UseAuthorization();
app.UseCors(
    options => {
        options.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000") ; }
);
app.MapControllers();

var scope= app.Services.CreateScope ();

var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager=scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger= scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try{
     await context.Database.MigrateAsync();
     await DBInitializer.Initialize(context, userManager);
}
catch (Exception ex) { logger.LogError(ex, "A problem occurred during Migration"); }

app.Run();