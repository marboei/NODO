using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedCardsAssignedToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "CardId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "CardUser",
                columns: table => new
                {
                    AssignedToId = table.Column<string>(type: "TEXT", nullable: false),
                    CardsAssignedId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardUser", x => new { x.AssignedToId, x.CardsAssignedId });
                    table.ForeignKey(
                        name: "FK_CardUser_AspNetUsers_AssignedToId",
                        column: x => x.AssignedToId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardUser_Cards_CardsAssignedId",
                        column: x => x.CardsAssignedId,
                        principalTable: "Cards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5143f679-8d59-468a-9d67-28304d7e27c8", "a09bb98e-b0cb-4fb7-856c-c127b3691a07", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "54027262-9b0f-4b53-86d8-07f457be229a", "cc1988b4-9d87-46cc-b8dc-ac30a5dff311", "Admin", "ADMIN" });

            migrationBuilder.CreateIndex(
                name: "IX_CardUser_CardsAssignedId",
                table: "CardUser",
                column: "CardsAssignedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardUser");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5143f679-8d59-468a-9d67-28304d7e27c8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "54027262-9b0f-4b53-86d8-07f457be229a");

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
    }
}
