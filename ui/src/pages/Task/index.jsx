import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTableColumn from '../DataTableColumn'
import CustomStyles from '../../constants/CustomStyles'
import DataTable from 'react-data-table-component'
import Notify from '../../Utilities/Notify'
import TaskService from '../../services/Task'

const Task = () => {
  const [taskList, setTaskList] = useState(null)
  const navigate = useNavigate()
  const onDetail = (id) => {
    navigate(`/task/detail/${id}`)
  };

  const getTaskList = async () => {
    const response = await TaskService.getTaskList();
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    setTaskList(response.data);
  };

  useLayoutEffect(() => {
    getTaskList();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-start justify-center  pt-16">
      <div className="w-full max-w-8xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Görev Listesi</h1>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => navigate('./add')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition duration-200"
          >
            Görev Ekle
          </button>
        </div>
        <DataTable
          columns={DataTableColumn.Tasks(onDetail)}
          data={taskList ?? []}
          noHeader
          defaultSortAsc={false}
          highlightOnHover
          striped
          pagination
          onRowDoubleClicked={(row) => (onDetail(row.id))}
          customStyles={CustomStyles}
        />
      </div>
    </div>
  )
}

export default Task
