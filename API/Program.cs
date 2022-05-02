using System.Text;
using System.Text.Json.Serialization;
using API.Data;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
/*builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );*/
builder.Services.AddCors();
// stores the connection string from appsettings.json


// adds dbcontext service and connects to database using the connection string
builder.Services.AddDbContext<ApplicationDbContext>(options => {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                                       string connStr;
                                       // Depending on if in development or production, use either Heroku-provided
                                       // connection string, or development connection string from env var.
                                       if (env == "Development")
                                       {
                                           // Use connection string from file.
                                           connStr = builder.Configuration.GetConnectionString("DefaultConnection");
                                       }
                                       else
                                       {
                                           // Use connection string provided at runtime by Heroku.
                                           var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                                           // Parse connection URL to connection string for Npgsql
                                           connUrl = connUrl.Replace("postgres://", string.Empty);
                                           var pgUserPass = connUrl.Split("@")[0];
                                           var pgHostPortDb = connUrl.Split("@")[1];
                                           var pgHostPort = pgHostPortDb.Split("/")[0];
                                           var pgDb = pgHostPortDb.Split("/")[1];
                                           var pgUser = pgUserPass.Split(":")[0];
                                           var pgPass = pgUserPass.Split(":")[1];
                                           var pgHost = pgHostPort.Split(":")[0];
                                           var pgPort = pgHostPort.Split(":")[1];
                                           connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}";
                                       }
                                       // Whether the connection string came from the local development configuration file
                                       // or from the environment variable from Heroku, use it to set up your DbContext.
                                       options.UseNpgsql(connStr);
    }
);


builder.Services.AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication(options => {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(o => {
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.TokenValidationParameters = new TokenValidationParameters {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:TokenKey"]))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddControllers().AddJsonOptions(x =>
//    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

app.Run();
