using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class FirstMigratio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0bd82238-eb5b-4f67-8cf0-c6aea6d41f36");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4791dead-d2aa-4eed-9092-5469229857b9");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0baa51e5-4ecf-4926-89b0-788703d1790f", "1ebdc641-cbb0-4b60-83a6-c47b36d26a15", "Admin", "ADMIN" },
                    { "dfc162be-8edb-4426-9686-74ea39c7fbc1", "9174c0f4-bc25-41f9-99f3-9c67fabde862", "Member", "MEMBER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "0bd82238-eb5b-4f67-8cf0-c6aea6d41f36", "fc1900e7-856d-463c-8ce2-6f88a6766ea8", "Admin", "ADMIN" },
                    { "4791dead-d2aa-4eed-9092-5469229857b9", "efb85903-325d-4a62-ba57-c9e42c3c90ce", "Member", "MEMBER" }
                });
        }
    }
}
