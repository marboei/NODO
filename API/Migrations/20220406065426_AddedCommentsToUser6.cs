using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedCommentsToUser6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "76ba26cf-89e5-4f44-88fe-736f64a56f8c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2025029-5ec7-442c-b2f2-c48731334003");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "Comment",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "286ab8e2-6134-40c1-99d0-29893004606c", "d31206c1-c9df-4f63-adc2-ec800751da57", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "73752456-d4a7-4ad4-affd-7c565256bccf", "110a9f22-b31c-45ba-9010-d355177e5e84", "Admin", "ADMIN" });

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "286ab8e2-6134-40c1-99d0-29893004606c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "73752456-d4a7-4ad4-affd-7c565256bccf");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "Comment",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "76ba26cf-89e5-4f44-88fe-736f64a56f8c", "0ddeceab-f8cc-453c-af87-186912689c40", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e2025029-5ec7-442c-b2f2-c48731334003", "8250e0d3-9712-4302-8de1-5468eb0f9c6a", "Admin", "ADMIN" });

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id");
        }
    }
}
