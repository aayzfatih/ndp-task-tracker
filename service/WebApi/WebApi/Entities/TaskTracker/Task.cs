using System;
using System.Collections.Generic;

namespace WebApi.Entities.TaskTracker;

public partial class Task
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int StateId { get; set; }

    public int PriortyId { get; set; }

    public int AssignedUserId { get; set; }

    public int CreatorUserId { get; set; }

    public bool Status { get; set; }

    public DateTime CreationDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public int? UpdatorUserId { get; set; }

    public virtual User AssignedUser { get; set; } = null!;

    public virtual User CreatorUser { get; set; } = null!;

    public virtual Priority Priorty { get; set; } = null!;

    public virtual TaskState State { get; set; } = null!;

    public virtual User? UpdatorUser { get; set; }
}
