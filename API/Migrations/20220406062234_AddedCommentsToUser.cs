using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedCommentsToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51ae2510-a841-45c5-81ec-ee55de14f2f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "547168b8-a4f4-472e-b0e9-40811a4ca7e2");

            migrationBuilder.AlterColumn<int>(
                name: "Order",
                table: "Columns",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "14c1ea4b-2d76-4f7f-8469-f13d06fb4384", "a14aa28d-fbdf-4fec-9ee0-5edf6772871d", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4ab48bab-149b-48ce-b449-0e1867713123", "f82e6288-f55b-4f53-a193-07a43ea8cdde", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "14c1ea4b-2d76-4f7f-8469-f13d06fb4384");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4ab48bab-149b-48ce-b449-0e1867713123");

            migrationBuilder.AlterColumn<int>(
                name: "Order",
                table: "Columns",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "51ae2510-a841-45c5-81ec-ee55de14f2f5", "c2530373-ee56-47d1-92d9-96dd1e157d6d", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "547168b8-a4f4-472e-b0e9-40811a4ca7e2", "90a3a3e5-9f77-4e4c-bcae-6326d08c6d24", "Member", "MEMBER" });
        }
    }
}
