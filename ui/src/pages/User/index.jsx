import React, { useLayoutEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import DataTableColumn from '../DataTableColumn'
import CustomStyles from '../../constants/CustomStyles'
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/User'
import Notify from '../../Utilities/Notify'

const User = () => {
  const [userList, setUserList] = useState(null);
  const navigate = useNavigate()

  const onDetail = (id) => {
    navigate(`./detail/${id}`)
  }

  const getuserList = async () => {
    const response = await UserService.getUserList();
    if (response.status !== 200 || response.error) {
      Notify.error(response.message);
      return;
    }
    setUserList(response.data);
  };

  useLayoutEffect(() => {
    getuserList();
  }, [])

  return (
    <div className="min-h-[80vh] flex items-start justify-center  pt-16">
      <div className="w-full max-w-8xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">Kullanıcı Listesi</h1>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => navigate('./add')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition duration-200"
          >
            Kullanıcı Ekle
          </button>
        </div>
        <DataTable
          columns={DataTableColumn.Users(onDetail)}
          data={userList ?? []}
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

export default User
