﻿using System;
using System.Collections.Generic;

namespace WebApi.Entities.TaskTracker;

public partial class TaskState
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
