import React, { useEffect, useState } from 'react';
import { HiArchiveBoxXMark } from "react-icons/hi2";

interface Store {
  _id?: string;
  name: string;
  openTime: string;
  closeTime: string;
  employees: number;
  slots: number;
}

const AdminDashboard: React.FC = () => {
  const [storeName, setStoreName] = useState<string>('');
  const [openTime, setOpenTime] = useState<string>('');
  const [closeTime, setCloseTime] = useState<string>('');
  const [numEmployees, setNumEmployees] = useState<string>('');
  const [store, setStore] = useState<Store[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string>('');

//   useEffect(() => {
//     async function fetchStores() {
//       const accessToken = localStorage.getItem('accessToken');
//       const userId = localStorage.getItem('userId');
//       if (!accessToken) {
//         console.error('Access token not found in localStorage');
//         return;
//       }
//       try {
//         const response = await fetch(`http://localhost:4000/api/v1/store/getStores/${userId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch stores');
//         }
//         const data = await response.json();
//         setStore(data.data);
//       } catch (error) {
//         console.error('Error fetching stores:', error);
//       }
//     }
//     fetchStores();
//   }, [setStore]);

  const submitHandler = async () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city:'',
        Gas_Price:'',
        lat:'',
        lng:'',
        status:''
      });
    setStore([...store, newStore]);
    setStoreName('');
    setOpenTime('');
    setCloseTime('');
    setNumEmployees('');
    setAvailableSlots('');

    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://localhost:4000/api/v1/store/createStore/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(newStore)
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to create store');
      }
    } catch (error) {
      console.error('Error occurred while creating store:', error);
    }
  };

  const deleteHandler = async (storeId: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/store/deleteStoreById/${storeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete store');
      }
      const data = await response.json();
      setStore(data.data);
    } catch (error) {
      console.error('Error occurred while deleting store:', error);
    }
  };

  return (
    <>
      <section className="rounded-md bg-black/70 p-2">
        <div className="flex items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2">
              <svg
                width="50"
                height="56"
                viewBox="0 0 50 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                  fill="black"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold leading-tight text-black">
              Create Your Own Desire Store
            </h2>
            <p className="mt-2text-sm text-gray-600 ">
              Don&#x27;t have an Store?{" "}
              <a
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free Gas Stations
              </a>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="storeName" className="text-base font-medium text-gray-900">
                    Gas Station Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Store Name"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="openTime" className="text-base font-medium text-gray-900">
                    Open Time
                  </label>
                  <div className="mt-2">
                    <input
                      id="openTime"
                      type="time"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Open Time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="closeTime" className="text-base font-medium text-gray-900">
                    Close Time
                  </label>
                  <div className="mt-2">
                    <input
                      id="closeTime"
                      type="time"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Close Time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numEmployees" className="text-base font-medium text-gray-900">
                    Number of Employees
                  </label>
                  <div className="mt-2">
                    <input
                      id="numEmployees"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Number of Employees"
                      value={numEmployees}
                      onChange={(e) => setNumEmployees(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="availableSlots" className="text-base font-medium text-gray-900">
                    Available Slots
                  </label>
                  <div className="mt-2">
                    <input
                      id="availableSlots"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Available Slots"
                      value={availableSlots}
                      onChange={(e) => setAvailableSlots(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-black px-3.5 py-2.5 text-sm font-semibold leading-4 text-white shadow-sm transition-all duration-200 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                    onClick={submitHandler}
                  >
                    Create Store
                  </button>
                </div>
              </div>
            </form>
            <div>
              <ul role="list" className="divide-y divide-gray-100">
                {store.map((store) => (
                  <li
                    key={store._id}
                    className="flex justify-between gap-x-6 py-5 bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex gap-x-4">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1566753323558-f4e0952af115"
                        alt=""
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{store.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {store.employees} Employees
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {store.slots} Slots
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">Open: {store.openTime}</p>
                      <p className="text-sm leading-6 text-gray-900">Close: {store.closeTime}</p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <button
                          type="button"
                          className="bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 rounded-md hover:bg-red-200"
                          onClick={() => store._id && deleteHandler(store._id)}
                        >
                          <HiArchiveBoxXMark className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
