using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class FirstMigra : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c9ebebf6-e707-4d2c-8d1f-8c461379e9b1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d313d01f-7cdd-444a-956c-072d1907e78a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a5db4332-459a-4c12-a9a7-dd9989868e7e", "ba719df1-4076-4cb5-a909-c98686d9b3ef", "Member", "MEMBER" },
                    { "eaf2edc0-97da-4618-974f-0e549e827ba9", "304e16e7-9408-4117-b690-7a422047080a", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a5db4332-459a-4c12-a9a7-dd9989868e7e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eaf2edc0-97da-4618-974f-0e549e827ba9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c9ebebf6-e707-4d2c-8d1f-8c461379e9b1", "db02b390-6870-42ea-ba3a-57fe272908fe", "Member", "MEMBER" },
                    { "d313d01f-7cdd-444a-956c-072d1907e78a", "9fe06c19-298c-457e-915f-d15b76cc163a", "Admin", "ADMIN" }
                });
        }
    }
}
