using MyWOFHAdminPanels.IdentityModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("https://localhost:7282/",
                                              "https://localhost:44493/",
                                              "http://localhost:5282/")
                                                .AllowAnyMethod()
                                                .AllowAnyHeader()
                                                .SetIsOriginAllowed(origin => true) // allow any origin 
                                                .AllowCredentials();
                      });
});


var SecretKey = builder.Configuration.GetSection("JWTSettings:SecretKey").Value;
var Issuer = builder.Configuration.GetSection("JWTSettings:Issuer").Value;
var Aaudience = builder.Configuration.GetSection("JWTSettings:Audience").Value;

var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
// Add services to the container.

var connectionStringUsers = builder.Configuration.GetConnectionString("IdentityDB");
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(connectionStringUsers));
builder.Services.AddIdentity<IdentityUser, IdentityRole>(t => { t.Password.RequireNonAlphanumeric = false; }).AddEntityFrameworkStores<UserDbContext>();

builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JWTSettings"));

builder.Services
    .ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = false;
    options.ExpireTimeSpan = TimeSpan.FromDays(1);

})
    .AddAuthentication(t =>
{
    t.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    t.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    t.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).
AddJwtBearer(t =>
{
    t.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = Issuer,
        ValidateAudience = true,
        ValidAudience = Aaudience,
        ValidateLifetime = true,
        IssuerSigningKey = signInKey,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.FromDays(1)

    };
}).AddCookie(options =>
{
    options.Cookie.Expiration = TimeSpan.FromDays(1);
    options.ExpireTimeSpan = TimeSpan.FromDays(1);
});

builder.Services.AddControllersWithViews();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
if (app.Environment.IsDevelopment())
{
    app.UseCors(MyAllowSpecificOrigins);
}
app.UseAuthentication();
app.UseAuthorization();
//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller}/{action=Index}/{id?}");
app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
