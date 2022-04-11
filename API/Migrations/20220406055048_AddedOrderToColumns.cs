using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedOrderToColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5035153-64d7-43ef-b86b-e8c6b3302b05");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cf8d4cc8-0d18-4d16-88d8-234d004c47f5");

            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "Columns",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "51ae2510-a841-45c5-81ec-ee55de14f2f5", "c2530373-ee56-47d1-92d9-96dd1e157d6d", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "547168b8-a4f4-472e-b0e9-40811a4ca7e2", "90a3a3e5-9f77-4e4c-bcae-6326d08c6d24", "Member", "MEMBER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51ae2510-a841-45c5-81ec-ee55de14f2f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "547168b8-a4f4-472e-b0e9-40811a4ca7e2");

            migrationBuilder.DropColumn(
                name: "Order",
                table: "Columns");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c5035153-64d7-43ef-b86b-e8c6b3302b05", "6092c10b-1538-411f-9489-b66ee7e22fae", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "cf8d4cc8-0d18-4d16-88d8-234d004c47f5", "4b5de7c0-a580-4861-80d7-1df54a5b4ecd", "Admin", "ADMIN" });
        }
    }
}
