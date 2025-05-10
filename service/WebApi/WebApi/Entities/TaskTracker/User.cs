using System;
using System.Collections.Generic;

namespace WebApi.Entities.TaskTracker;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public virtual ICollection<Task> TaskAssignedUsers { get; set; } = new List<Task>();

    public virtual ICollection<Task> TaskCreatorUsers { get; set; } = new List<Task>();

    public virtual ICollection<Task> TaskUpdatorUsers { get; set; } = new List<Task>();
}
