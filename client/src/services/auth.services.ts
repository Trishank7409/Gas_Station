
interface LoginCredentials {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

interface RegisterCredentials{
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirmPassword: FormDataEntryValue | null;
  fullName: FormDataEntryValue | null;
  role: FormDataEntryValue|null
}

interface Station{
  name: String,
  lat: Number,
  lng: Number,
  address: String,
  city: String,
  state: String,
  Gas_Price: Number,
}

interface LoginResponse {
  success: any;
  data: any;
  token: string;
  user: {
    id: string;
    username: string;
  };
}

interface RegisterResponse{
  success: any;
  data: any;

}

const UserServices = {
  loginUser: async (Credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Credentials),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: LoginResponse = await response.json();
    return data;
  },

  // Log out user
  logoutUser: async (): Promise<void> => {
    const response = await fetch('http://localhost:8000/api/auth/loggedOut', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  // User Registration
  registerUser: async (Credentials: RegisterCredentials): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Credentials),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    const data: RegisterResponse = await response.json();
    return data;
    // return data;
    // console.log(data);
  },

  // createthe station
  createStation: async (station: Station,userId:string,token:string): Promise<Station> => {
  
    // const userId=state.userInfo
    // const accessToken = localStorage.getItem('accessToken');
    // const userId =localStorage.getItem('userId')
    console.log("userid",userId)

    const response = await fetch('http://localhost:8000/api/station/create-station${userId}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(station),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Station creation failed');
    }
    const data: Station = await response.json();
    return data;
  },
};

export default UserServices;
