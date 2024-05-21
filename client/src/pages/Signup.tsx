import { useState } from 'react'
import UserServices from '../services/auth.services';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    fullName:'',
    role:'User'
  });
  const[role,setrole]=useState("Admin")
  function changeHandler(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data= {...formData, role}
    console.log("data",data)
    try {
        const response = await UserServices.registerUser(data)
        console.log(response); // Handle the response as needed

        if (response.success) {
          navigate('/login')
        } else {
            console.error(response.data.error)
        }
    } catch (error) {
        console.error("error in login",error)
    }
}

  return (
<div className="h-3/5">
      <section>
<div className="grid grid-cols-1 lg:grid-cols-2 ">
  <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
      <p className="mt-2 text-base text-gray-600">
        Already have an account?{' '}
        <a
          href="/login"
          title=""
          className="font-medium text-black transition-all duration-200 hover:underline"
        >
          Log In
        </a>
      </p>
      <div className="flex bg-slate-800 p-1 gap-x-1 mt-6 rounded-full max-w-max ">
        <button className={`${role=== "Admin"? "bg-slate-900 text-slate-300":"bg-transparent text-slate-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setrole("Admin")}>Admin</button>
        <button className={`${role=== "User"? "bg-slate-900 text-slate-300":"bg-transparent text-slate-200"} py-2 px-5 rounded-full transition-all duration-200`} onClick={()=>setrole("User")}>User</button>
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base font-medium text-gray-900">
              {' '}
              Full Name{' '}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Full Name"
                id="name"
                name="fullName"
                value={formData.fullName}
                onChange={changeHandler}
                required
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-base font-medium text-gray-900">
              {' '}
              Email address{' '}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                required
              ></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-base font-medium text-gray-900">
                {' '}
                Password{' '}
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
              ></input>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-base font-medium text-gray-900">
                {' '}
                Confirm Password{' '}
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Confirm-Password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
                required
              ></input>
            </div>
          </div>
          <div>
            <button
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div className="h-full w-full">
    <img
      className="mx-auto mt-7 pt-8 h-3/4 w-full rounded-md object-cover"
      src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
      alt=""
    />
  </div>
</div>
      </section>
    </div>
  )
}

export default Signup
