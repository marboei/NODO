using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedLabelDescDueAssignedToCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a9ba5633-e796-4f0c-9803-55c9016364d0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e74a8d2d-8551-482d-a62e-07d48a415294");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Cards",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "Cards",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "Cards",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CardId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0c4b6516-bec3-4961-8dfb-29ef4287eba1", "76e6599d-14d7-46c1-82de-42884dc8e368", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2e9fe8fd-a321-4f57-b0a0-019db49bc19b", "ad38dd10-7664-4f0e-a96d-810acdf81514", "Admin", "ADMIN" });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_CardId",
                table: "AspNetUsers",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Cards_CardId",
                table: "AspNetUsers",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Cards_CardId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_CardId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0c4b6516-bec3-4961-8dfb-29ef4287eba1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2e9fe8fd-a321-4f57-b0a0-019db49bc19b");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "Label",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "CardId",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a9ba5633-e796-4f0c-9803-55c9016364d0", "8b86e531-818f-498b-a25a-bafbbba4922a", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e74a8d2d-8551-482d-a62e-07d48a415294", "2d34769b-a3dd-4b53-a103-25dc7ac5f46c", "Admin", "ADMIN" });
        }
    }
}
