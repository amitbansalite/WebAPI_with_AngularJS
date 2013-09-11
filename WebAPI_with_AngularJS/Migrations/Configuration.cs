using WebAPI_with_AngularJS.Models;

namespace WebAPI_with_AngularJS.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WebAPI_with_AngularJS.Models.TodoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebAPI_with_AngularJS.Models.TodoContext context)
        {
            var r = new Random();
            var items = Enumerable.Range(1, 50).Select(x => new Todo
                {
                    Text = x.ToString(),
                    DueDate = new DateTime(2012, r.Next(1,12), r.Next(1,28)),
                    Priority = (byte)r.Next(1,10)
                }).ToArray();

            context.Todoes.AddOrUpdate(item => new {item.Text}, items);
        }
    }
}
