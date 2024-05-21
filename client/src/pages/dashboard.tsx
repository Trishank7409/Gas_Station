import React, { useEffect, useState } from 'react';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import UserServices from '../services/auth.services';
import { UserContext } from '../context/userContext';

const AdminDashboard = () => {
  const userContext=React.useContext(UserContext)
  if(!userContext){
    throw new Error('UserContext must be used with in provider')
  }
  const {state}=userContext
  const userID=state.userInfo.data.userId
  const token= state.userInfo.data.token
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city:'',
        state:'',
        Gas_Price:0,
        lat:0,
        lng:0,
        // status:true
      });
      function changeHandler(event: React.FormEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        setFormData((prevData) => ({
          ...prevData,
          [target.name]: target.value,
        }));
      }

      async function submitHandler(){
        const data= {...formData}
        console.log("data",data)
        try {
            const response = await UserServices.createStation(data,userID,token)
            console.log(response); // Handle the response as needed
      }
       catch (error) {
        console.error(error);
      }
    }
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
              Create Your Own Desire Gas Station
            </h2>
            <p className="mt-2text-sm text-gray-600 ">
              Don&#x27;t have an Station?{" "}
              <a
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free Gas Stations
              </a>
            </p>
            <form onSubmit={submitHandler} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="storeName" className="text-base font-medium text-gray-900">
                    Gas Station Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Station Name"
                      value={formData.name}
                      onChange={changeHandler}
                      required
                      type="string"
                      name="name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="openTime" className="text-base font-medium text-gray-900">
                    Street
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      type="string"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Street"
                      value={formData.address}
                      onChange={changeHandler}
                      required
                      name="address"

                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="closeTime" className="text-base font-medium text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      type="string"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="City Name"
                      value={formData.city}
                      onChange={changeHandler}
                      name='city'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="closeTime" className="text-base font-medium text-gray-900">
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      type="string"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="State Name"
                      value={formData.state}
                      onChange={changeHandler}
                      name='state'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numEmployees" className="text-base font-medium text-gray-900">
                   Define Lattitude
                  </label>
                  <div className="mt-2">
                    <input
                      id="lat"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Lattitude"
                      value={formData.lat}
                      onChange={changeHandler}
                      name='lat'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="availableSlots" className="text-base font-medium text-gray-900">
                    Longitude
                  </label>
                  <div className="mt-2">
                    <input
                      id="lng"
                      type="number"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Available Slots"
                      value={formData.lng}
                      onChange={changeHandler}
                      name='lng'
                    />
                  </div>
                </div>

                <div>
                  <button
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-black px-3.5 py-2.5 text-sm font-semibold leading-4 text-white shadow-sm transition-all duration-200 hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Create Station
                  </button>
                </div>
              </div>
            </form>
            {/* <div>
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
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
