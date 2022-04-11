using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddedCommentsToUser5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cards_Columns_ColumnId",
                table: "Cards");

            migrationBuilder.DropForeignKey(
                name: "FK_CardUser_Cards_CardsAssignedId",
                table: "CardUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Cards_CardId",
                table: "Comment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cards",
                table: "Cards");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2a295a96-9dfa-4c65-9cd8-ab2674cf3522");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c13917e1-22aa-4bdb-8d18-8e2eb8fe7c89");

            migrationBuilder.RenameTable(
                name: "Cards",
                newName: "Card");

            migrationBuilder.RenameIndex(
                name: "IX_Cards_ColumnId",
                table: "Card",
                newName: "IX_Card_ColumnId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Card",
                table: "Card",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "76ba26cf-89e5-4f44-88fe-736f64a56f8c", "0ddeceab-f8cc-453c-af87-186912689c40", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e2025029-5ec7-442c-b2f2-c48731334003", "8250e0d3-9712-4302-8de1-5468eb0f9c6a", "Admin", "ADMIN" });

            migrationBuilder.AddForeignKey(
                name: "FK_Card_Columns_ColumnId",
                table: "Card",
                column: "ColumnId",
                principalTable: "Columns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CardUser_Card_CardsAssignedId",
                table: "CardUser",
                column: "CardsAssignedId",
                principalTable: "Card",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment",
                column: "CardId",
                principalTable: "Card",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Card_Columns_ColumnId",
                table: "Card");

            migrationBuilder.DropForeignKey(
                name: "FK_CardUser_Card_CardsAssignedId",
                table: "CardUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Card_CardId",
                table: "Comment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Card",
                table: "Card");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "76ba26cf-89e5-4f44-88fe-736f64a56f8c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e2025029-5ec7-442c-b2f2-c48731334003");

            migrationBuilder.RenameTable(
                name: "Card",
                newName: "Cards");

            migrationBuilder.RenameIndex(
                name: "IX_Card_ColumnId",
                table: "Cards",
                newName: "IX_Cards_ColumnId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cards",
                table: "Cards",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2a295a96-9dfa-4c65-9cd8-ab2674cf3522", "a4e9774d-2b43-4ac4-9332-d5d6dd1242c1", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c13917e1-22aa-4bdb-8d18-8e2eb8fe7c89", "760052bf-7ea9-48f1-8678-69bda89b284b", "Member", "MEMBER" });

            migrationBuilder.AddForeignKey(
                name: "FK_Cards_Columns_ColumnId",
                table: "Cards",
                column: "ColumnId",
                principalTable: "Columns",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CardUser_Cards_CardsAssignedId",
                table: "CardUser",
                column: "CardsAssignedId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Cards_CardId",
                table: "Comment",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id");
        }
    }
}
