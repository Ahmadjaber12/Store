using System.Text;
using api.Data;
using api.Enitites;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
builder.Services.AddIdentityCore<User>().AddRoles<Role>().AddEntityFrameworkStores<StoreContext>();
builder.Services.AddScoped<TokenServices>();    
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt=>{
     opt.TokenValidationParameters=new TokenValidationParameters{
            ValidateIssuer=false,
            ValidateAudience=false,
            ValidateLifetime=true,
            ValidateIssuerSigningKey=true,
            IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes(builder.Configuration["JWTSettings:TokenKey"])),
    };
});
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

app.UseAuthentication();
app.UseAuthorization();
app.UseCors(
    options => {
        options.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials() ; }
);
app.MapControllers();

var scope= app.Services.CreateScope();

var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager=scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger= scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try{
     await context.Database.MigrateAsync();
     await DBInitializer.Initialize(context, userManager);
}
catch (Exception ex) { logger.LogError(ex, "A problem occurred during Migration"); }

app.Run();