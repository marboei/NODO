using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "43f9b42e-6847-4b18-82fd-434d566b0d24");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bba91857-fc5b-4c07-836f-b2db8baf192b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0bd82238-eb5b-4f67-8cf0-c6aea6d41f36", "fc1900e7-856d-463c-8ce2-6f88a6766ea8", "Admin", "ADMIN" },
                    { "4791dead-d2aa-4eed-9092-5469229857b9", "efb85903-325d-4a62-ba57-c9e42c3c90ce", "Member", "MEMBER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "43f9b42e-6847-4b18-82fd-434d566b0d24", "f6cd0805-8dea-4d3b-a775-398ea1fa954a", "Member", "MEMBER" },
                    { "bba91857-fc5b-4c07-836f-b2db8baf192b", "87b4c9ef-c826-4aff-99a3-51b7be5e1601", "Admin", "ADMIN" }
                });
        }
    }
}
