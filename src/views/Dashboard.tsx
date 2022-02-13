import { loginApi } from "api/authApi"
import { getUsers } from "api/userApi"
import { User } from "entities/user"
import { useEffect, useState } from "react"
import { Pagination } from 'antd'
import { useRequest } from "@umijs/hooks"

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const login = async () => {
      console.log('hello')
      try {
        const token = await loginApi({})
        localStorage.setItem('token', token)
      } catch (e: any) {
        console.log('e', e)
      }
    }
    login()
  }, [])

  const { data, run, loading, pagination } = useRequest(
    ({ current, pageSize }) => getUsers({ current, pageSize, searchTerm }),
    {
      paginated: true,
      defaultPageSize: 5,
      debounceInterval: 300,
    }
  )

  return (
   <div className="flex w-screen max-w-screen-xl mx-auto bg-gray-100">
      <div className="w-1/5 max-w-360-px border-2 py-12 h-screen bg-teal-100">
        <div className="flex flex-col px-4">
          <div className="flex-1 text-xl">
            Dashboard
          </div>
        </div>
      </div>

      <div className="w-4/5 py-12 h-screen">
        <div className="flex flex-col px-4">
          <div className="flex-1 mb-6">
            <h2 className="text-3xl">Dashboard</h2>
          </div>

          <div className="w-full flex flex-col border-2 rounded-md shadow-md p-5">
            <h3 className="text-xl mb-3">Danh sách người dùng</h3>
            <input type="text" className="p-3 rounded-md max-w-250-px" placeholder="Tìm kiếm người dùng" onChange={(e) => {
              setSearchTerm(e.target.value)
              run(pagination)
            }} />
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-500">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tên
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Số điện thoại
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Username
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap w-full rounded-md">
                              Loading...
                            </td>
                          </tr>
                        ) :
                        !!data && data?.data.length > 0 && data?.data.map((user: User) => (
                          <tr key={user.id} className="border-b-2 rounded-md">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-30">
                                  {user.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {user.phone}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Pagination
                {...(pagination as any)}
                showQuickJumper
                showSizeChanger
                onShowSizeChange={pagination.onChange}
                style={{ marginTop: 16, textAlign: 'right' }}
              />
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}
export default Dashboard
