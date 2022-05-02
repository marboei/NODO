using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services; 

public static class IWebHostExtensions
{
    public static IWebHost MigrateDatabase(this IWebHost webHost)
    {
        // Manually run any outstanding migrations if configured to do so
        var envAutoMigrate = Environment.GetEnvironmentVariable("AUTO_MIGRATE");
        if (envAutoMigrate != null && envAutoMigrate == "true")
        {
            Console.WriteLine("*** AUTO MIGRATE ***");

            var serviceScopeFactory = (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;
                var dbContext = services.GetRequiredService<ApplicationDbContext>();

                dbContext.Database.Migrate();
            }
        }

        return webHost;
    }
}