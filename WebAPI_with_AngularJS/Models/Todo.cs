using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_with_AngularJS.Models
{
    public class Todo
    {
        public int Id { get; set; }

        public string Text { get; set; }

        // ? in C# means nullable.. in other words we dont need to fill it out
        public DateTime? DueDate { get; set; }

        public int Priority { get; set; }
    }
}