import React from 'react';
import { format } from "date-fns";
import { Badge } from 'reactstrap';
import Constants from '../constants';

const DataTableColumn = {
  Users: (onDetail) => [
    {
      name: 'Aksiyon',
      width: '5rem',
      cell: d => (
        <span className="text-nowrap">
          <button type="button" onClick={() => onDetail(d.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </span>
      ),
    },
    {
      name: ('ID'),
      selector: row => row.id,
      sortable: true,
      cell: row => row.id,
    },
    {
      name: ('Ad'),
      selector: row => row.name,
      sortable: true,
      cell: row => row.name,
    },
    {
      name: ('Soyad'),
      selector: row => row.surname,
      sortable: true,
      cell: row => row.surname,
    },
    {
      name: ('E-Posta'),
      selector: row => row.email,
      sortable: true,
      cell: row => row.email,
    },
    {
      name: ('Phone'),
      selector: row => row.phone,
      sortable: true,
      cell: row => row.phone,
    },
  ],
  Tasks: (onDetail) => [
    {
      name: 'Aksiyon',
      width: '5rem',
      cell: d => (
        <span className="text-nowrap">
          <button type="button" onClick={() => onDetail(d.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </span>
      ),
    },
    {
      name: ('ID'),
      selector: row => row.id,
      width: '5rem',
      sortable: true,
      cell: row => row.id,
    },
    {
      name: ('Görev Başlığı'),
      selector: row => row.taskTitle,
      sortable: true,
      cell: row => row.taskTitle,
    },
    {
      name: ('Açıklama'),
      selector: row => row.description,
      sortable: true,
      cell: row => row.description,
    },
    {
      name: ('Sorumlu Kişi'),
      selector: row => row.assignedUserName,
      sortable: true,
      cell: row => row.assignedUserName,
    },
    {
      name: ('Durum'),
      selector: row => row.taskStateName,
      sortable: true,
      cell: row =>
        <Badge color="warning" className="text-white">
          {row.taskStateName}
        </Badge >,
    },
    {
      name: ('Öncelik'),
      selector: row => row.priorityName,
      sortable: true,
      cell: row => row.priorityId === Constants.Task.Priority.Low ?
        (
          <Badge color="success" className="text-white">
            {row.priorityName}
          </Badge >
        ) : (
          <Badge color="danger" className="text-white">
            {row.priorityName
            }
          </Badge >
        ),
    },
    {
      name: ('Başlangıç Tarih'),
      selector: row => row.startDate,
      sortable: true,
      cell: row => format(new Date(row.startDate), 'dd/MM/yyyy'),
    },
    {
      name: ('Son Tarih'),
      selector: row => row.endDate,
      sortable: true,
      cell: row => format(new Date(row.endDate), 'dd/MM/yyyy'),
    },
    {
      name: ('Oluşturulma Tarih'),
      selector: row => row.creationDate,
      sortable: true,
      cell: row => format(new Date(row.creationDate), 'dd/MM/yyyy'),
    },
  ],
};
export default DataTableColumn;