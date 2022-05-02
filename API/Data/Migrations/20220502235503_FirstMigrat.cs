using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class FirstMigrat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0baa51e5-4ecf-4926-89b0-788703d1790f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dfc162be-8edb-4426-9686-74ea39c7fbc1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "c9ebebf6-e707-4d2c-8d1f-8c461379e9b1", "db02b390-6870-42ea-ba3a-57fe272908fe", "Member", "MEMBER" },
                    { "d313d01f-7cdd-444a-956c-072d1907e78a", "9fe06c19-298c-457e-915f-d15b76cc163a", "Admin", "ADMIN" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "0baa51e5-4ecf-4926-89b0-788703d1790f", "1ebdc641-cbb0-4b60-83a6-c47b36d26a15", "Admin", "ADMIN" },
                    { "dfc162be-8edb-4426-9686-74ea39c7fbc1", "9174c0f4-bc25-41f9-99f3-9c67fabde862", "Member", "MEMBER" }
                });
        }
    }
}
